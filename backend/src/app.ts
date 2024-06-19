import Express, { ErrorRequestHandler } from 'express'
import { UsersController } from './controllers/UsersController.js'
import { singleton } from './tools/singleton.js'
import { _catch } from './middlewares/catch.js'
import { scope } from './middlewares/scope.js'
import { AuthenticationController } from './controllers/AuthenticationController.js'
import cors from 'cors'
import { ConversationsController } from './controllers/ConversationsController.js'
import { ConsumersController } from './controllers/ConsumersController.js'
import { logger } from './middlewares/logger.js'

export const app = Express()

app.use(logger)
app.use(cors())
app.use(Express.json())

app.post(
  '/auth/sign-in',
  _catch((req, res, next) => {
    singleton(AuthenticationController).signIn(req, res).catch(next)
  })
)

app.get(
  '/consumers',
  scope('consumers:*', 'consumers:read'),
  _catch((req, res) => singleton(ConsumersController).find(req, res))
)

app.put(
  '/consumers',
  scope('conversations:*', 'conversations:write'),
  _catch((req, res) => singleton(ConsumersController).save(req, res))
)

app.post(
  '/consumers/sign-in',
  _catch((req, res) => singleton(ConsumersController).signIn(req, res))
)

app.get(
  '/consumers/:consumerId',
  scope('consumers:*', 'consumers:read', req => req.token.sub === `consumer:${req.params.consumerId}`),
  _catch((req, res) =>
    singleton(ConsumersController).findOne(req, res)
  )
)

app.get(
  '/consumers/:consumerId/conversations',
  scope('conversations:*', 'conversations:read', req => req.token.sub === `consumer:${req.params.consumerId}`),
  _catch((req, res) =>
    singleton(ConsumersController).findConversations(req, res)
  )
)

app.post(
  '/consumers/:consumerId/conversations',
  scope('conversations:*', 'conversations:write', req => req.token.sub === `consumer:${req.params.consumerId}`),
  _catch((req, res) =>
    singleton(ConsumersController).addConversation(req, res)
  )
)

app.get(
  '/conversations',
  scope('conversations:*', 'conversations:read'),
  _catch((req, res) => singleton(ConversationsController).find(req, res))
)

app.get(
  '/conversations/:conversationId',
  scope('conversations:*', 'conversations:read', req => [`conversations:${req.params.id}:*`, `conversations:${req.params.id}:read`], req => req.token.sub.startsWith('consumer:')),
  _catch((req, res) => singleton(ConversationsController).findOne(req, res))
)

app.delete(
  '/conversations/:conversationId',
  scope('conversations:*', 'conversations:write', req => [`conversations:${req.params.id}:*`, `conversations:${req.params.id}:write`], req => req.token.sub.startsWith('consumer:')),
  _catch((req, res) => singleton(ConversationsController).delete(req, res))
)

app.get(
  '/conversations/:conversationId/messages',
  scope('conversations:*', 'conversations:read', req => [`conversations:${req.params.id}:*`, `conversations:${req.params.id}:read`], req => req.token.sub.startsWith('consumer:')),
  _catch((req, res) => singleton(ConversationsController).findMessages(req, res))
)

app.post(
  '/conversations/:conversationId/messages',
  scope('conversations:*', 'conversations:write', req => [`conversations:${req.params.id}:*`, `conversations:${req.params.id}:write`], req => req.token.sub.startsWith('consumer:')),
  _catch((req, res) => singleton(ConversationsController).addMessage(req, res))
)

app.get(
  '/users',
  scope('users:*', 'users:read'),
  _catch((req, res) => singleton(UsersController).find(req, res))
)

app.put(
  '/users',
  scope('users:*', 'users:write', req => req.body?.id && [`users:${req.body.id}:*`, `users:${req.body.id}:write`]),
  _catch((req, res) => singleton(UsersController).save(req, res))
)

app.get(
  '/users/:userId',
  scope('users:*', 'users:read', req => [`users:${req.params.id}:*`, `users:${req.params.id}:read`]),
  _catch((req, res) =>
    singleton(UsersController).findOne(req, res)
  )
)

app.patch(
  '/users/:userId',
  scope('users:*', 'users:write', req => [`users:${req.params.id}:*`, `users:${req.params.id}:write`]),
  _catch((req, res) =>
    singleton(UsersController).update(req, res)
  )
)

app.delete(
  '/users/:userId',
  scope('users:*', 'users:write', req => [`users:${req.params.id}:*`, `users:${req.params.id}:write`]),
  _catch((req, res) => 
    singleton(UsersController).save(req, res)
  )
)

app.use((req, res) => {
  res.status(404).send()
})

app.use(((error, req, res) => {
  console.error(error)

  if (!(error instanceof Error)) return res.status(500).json({ message: 'Internal Server Error' })

  res.status(500).json({ message: error.message })
}) as ErrorRequestHandler)
