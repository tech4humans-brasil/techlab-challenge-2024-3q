import { Box, MenuItem, Select, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { useAccessToken } from "../hooks/useAuthenticationContext";
import { IUser } from "../interfaces/IUser";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save'

export function UserScreen() {
  const params = useParams()
  const userId = params.userId

  if (!userId) throw new Error('No userId provided')

  const accessToken = useAccessToken()

  const save = useMutation({
    mutationFn: async (user: Partial<IUser>) => {
      await api.put(`/users`, { ...user, id: self.crypto.randomUUID() }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    }
  })

  const user = useQuery({
    queryKey: ['users', userId],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      return response.data as IUser
    }
  })

  const form = useForm<Partial<IUser>>({})

  useEffect(() => {
    if (!user.data) return;

    Object.entries(user.data).map(([key, value]) => {
      // @ts-expect-error: I know exactly what I'm doing ok?
      form.setValue(key, value)
    })
  }, [user.data])

  if (!user.data) return 'Carregando...'

  return (
    <Box>
      <Box>
        <TextField label="Username" {...form.register('username')} fullWidth />
      </Box>
      <Box>
        <TextField label="E-mail" {...form.register('email')} fullWidth />
      </Box>
      <Box>
        <TextField label="Password" {...form.register('password')} type="password" fullWidth />
      </Box>
      <Box>
        <Select label="Profile" {...form.register('profile')} fullWidth>
          <MenuItem value='standard'>Standard</MenuItem>
          <MenuItem value='sudo'>Sudo</MenuItem>
        </Select>
      </Box>
      <Box>
      <LoadingButton loading={save.isPending} variant="contained" style={{ padding: 16 }} startIcon={<SaveIcon />} onClick={
        // @ts-expect-error: I know exactly what I'm doing ok?
        form.handleSubmit(save.mutate)}
      >
        Salvar
      </LoadingButton>
      </Box>
    </Box>
  )
}