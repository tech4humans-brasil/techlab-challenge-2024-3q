import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationProvider";
import { IConversation } from "../interfaces/IConversation";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, List, ListItem, Grid, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { IConversationMessage } from "../interfaces/IConversationMessage";
import { useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';

export interface TemporaryConversationMessage {
  id: string
  by: 'system' | 'consumer'
  content: string
  createdAt: string
}

export interface IConversationMessageInput {
  content: string
}

export function Chat() {
  const scrollRef = useRef<HTMLElement>(null)

  const { consumer, isLoading, accessToken, signIn } = useContext(AuthenticationContext)

  const conversationQuery = useQuery({
    queryKey: ['conversations', consumer?.id],
    queryFn: async () => {
      const response = await api.get(`/consumers/${consumer!.id}/conversations`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      return (response.data.conversations[0] ?? null) as IConversation | null
    },
    enabled: !!consumer,
  })

  const conversation = conversationQuery.data

  const messagesQuery = useQuery({
    queryKey: ['conversations', conversation?.id, 'messages'],
    queryFn: async () => {
      const response = await api.get(`/conversations/${conversation!.id}/messages`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      setTemporaryConversationMessages([])

      return response.data as {
        count: number
        messages: IConversationMessage[]
      }
    },
    enabled: !!conversation,
    refetchInterval: 20 * 1000
  })

  const [temporaryConversationMessages, setTemporaryConversationMessages] = useState<TemporaryConversationMessage[]>([])

  const pushTemporaryConversationMessage = useCallback((message: Omit<TemporaryConversationMessage, 'id' | 'createdAt'>) => {
    setTemporaryConversationMessages((messages) => [
      ...messages,
      { id: self.crypto.randomUUID(), createdAt: new Date().toISOString(), ...message }
    ])
  }, [])

  const messages = useMemo(() => [
    ...messagesQuery.data?.messages ?? [],
    ...temporaryConversationMessages
  ].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
  [temporaryConversationMessages, messagesQuery.data?.messages])

  const documentQuestionOpen = useRef(false)
  const subjectQuestionOpen = useRef(false)

  const send = useMutation({
    mutationFn: async (conversationMessageInput: IConversationMessageInput) => {
      if (documentQuestionOpen.current) {
        signIn(conversationMessageInput.content)

        pushTemporaryConversationMessage({ by: 'consumer', content: conversationMessageInput.content })

        documentQuestionOpen.current = false

        return
      }

      if (subjectQuestionOpen.current) {
        pushTemporaryConversationMessage({ by: 'consumer', content: conversationMessageInput.content })

        await api.post(
          `/consumers/${consumer!.id}/conversations`,
          {
            subject: conversationMessageInput.content,
            messages: [...temporaryConversationMessages, { by: 'consumer', content: conversationMessageInput.content, createdAt: new Date().toISOString() }]
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )

        subjectQuestionOpen.current = false

        conversationQuery.refetch()

        return
      }

      if (!conversation) return void 0

      else await api.post(
        `/conversations/${conversation.id}/messages`,
        { content: conversationMessageInput.content },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )

      messagesQuery.refetch()
    },
    onSuccess: () => messagesQuery.refetch()
  })

  const form = useForm({
    defaultValues: { content: '' },
  })

  const handleSubmit = useCallback((message: IConversationMessageInput) => {
    message.content = message.content?.trim()

    if (!message.content) return;

    form.reset()

    send.mutate(message)
  }, [send.mutate, form])

  const submit = form.handleSubmit(handleSubmit)

  const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return

    if (event.shiftKey) return

    event.stopPropagation()

    submit(event)
  }, [submit])

  useEffect(() => {
    if (isLoading) return;

    if (consumer) return;

    if (documentQuestionOpen.current) return;

    documentQuestionOpen.current = true

    pushTemporaryConversationMessage({ by: 'system', content: 'Qual o número do seu documento?' })
  }, [isLoading, consumer])

  useEffect(() => {
    if (conversationQuery.isLoading) return;

    if (conversation !== null) return;7
    
    pushTemporaryConversationMessage({ by: 'system', content: 'Qual o assunto do atendimento?' })

    subjectQuestionOpen.current = true
  }, [conversationQuery.isLoading, conversation])

  return (
    <Box display='flex' flexDirection='column' height='100vh' py={2}>
      <Box>
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
          <Grid item sm={11}>
            <TextField {...form.register('content')} multiline fullWidth onSubmit={submit} onKeyUp={handleKeyPress}/>
          </Grid>
          <Grid item sm={1} mt='auto'>
            <LoadingButton loading={send.isPending} variant="contained" style={{ padding: 16 }} startIcon={<SendIcon />} onClick={submit}>
              Send
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
