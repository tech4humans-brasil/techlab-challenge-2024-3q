import { Box, Grid, List, ListItem, Skeleton, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../services/api.js";
import { IConversation } from "../interfaces/IConversation.js";
import { IConversationMessage } from "../interfaces/IConversationMessage.js";
import { useAccessToken } from "../hooks/useAuthenticationContext.js";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send.js';
import CloseIcon from '@mui/icons-material/Close.js';
import { LoadingButton } from "@mui/lab";

interface IConversationMessageInput {
  content: string
}

export function ConversationScreen() {
  const params = useParams()
  const conversationId = params.conversationId
  const scrollRef = useRef<HTMLElement>(null)

  if (!params.conversationId) throw new Error('No conversationId provided')

  const accessToken = useAccessToken()

  const conversation = useQuery({
    queryKey: ['conversations', conversationId],
    queryFn: async () => {
      const response = await api.get(`/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      return response.data as IConversation
    }
  })

  const messagesQuery = useQuery({
    queryKey: ['conversations', conversationId, 'messages'],
    queryFn: async () => {
      const response = await api.get(`/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      return response.data as {
        count: number
        messages: IConversationMessage[]
      }
    },
    refetchInterval: 20 * 1000
  })

  const send = useMutation({
    mutationFn: async (conversationMessageInput: IConversationMessageInput) => {
      await api.post(
        `/conversations/${conversationId}/messages`,
        { content: conversationMessageInput.content },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
    },
    onSuccess: () => messagesQuery.refetch()
  })

  const close = useMutation({
    mutationFn: async () => {
      await api.delete(
        `/conversations/${conversationId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
    },
    onSuccess: () => messagesQuery.refetch()
  })

  const form = useForm({
    defaultValues: { content: '' },
  })

  const handleSubmit = useCallback((message: IConversationMessageInput) => {
    if (!message.content) return;

    send.mutate(message, {
      onSuccess: () => {
        form.reset()
      }
    })
  }, [send.mutate, form])

  const submit = form.handleSubmit(handleSubmit)

  const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return

    if (event.shiftKey) return

    event.stopPropagation()

    submit(event)
  }, [submit])

  const messages = useMemo(() => {
    return (messagesQuery.data?.messages ?? []).slice().sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  }, [messagesQuery.data?.messages])

  useEffect(() => {
    if (!scrollRef.current) return

    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  if (conversation.isLoading) return (
    <Skeleton variant="rounded" width={210} height={60} />
  )

  if (!conversation.data) throw new Error('Failed to laod conversation')

  return (
    <Box display='flex' flexDirection='column' height='100vh' py={2}>
      <Box>
        <Typography variant='h5'>{conversation.data.subject}</Typography>
        {conversation.data.consumer.name && <Typography variant='subtitle1'>{conversation.data.consumer.name}</Typography>}
        <Typography variant='subtitle1'>{conversation.data.consumer.document}</Typography>
      </Box>
      <Box maxHeight='80%' overflow='hidden scroll' ref={scrollRef}>
        <List>
          {messages.map((message) => (
            <ListItem key={`messages:${message.id}`}>
              <Typography variant='body1'>{message.content}</Typography>
              <span style={{ width: 5 }}/>
              <Typography variant='overline'>- {new Date(message.createdAt).toLocaleString()}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box mt='auto' px={4}>
        <Grid container spacing={2}>
          <Grid item sm={10}>
            <TextField {...form.register('content')} multiline fullWidth onSubmit={submit} onKeyUp={handleKeyPress}/>
          </Grid>
          <Grid item sm={1} mt='auto'>
            <LoadingButton loading={send.isPending} variant="contained" style={{ padding: 16 }} startIcon={<SendIcon />} onClick={submit}>
              Send
            </LoadingButton>
          </Grid>
          <Grid item sm={1} mt='auto'>
            <LoadingButton loading={close.isPending} variant="contained" style={{ padding: 16 }} startIcon={<CloseIcon />} onClick={() => close.mutate()}>
              Close
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
