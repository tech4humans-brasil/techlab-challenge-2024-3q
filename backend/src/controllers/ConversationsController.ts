/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { Conversation } from "../entities/Conversation.js";
import { database } from "../services/database.js";
import { ConversationMessage, ConversationMessageBy } from "../entities/ConversationMessage.js";
import { User } from "../entities/User.js";

export class ConversationsController {
  protected get repository() {
    return database.getRepository(Conversation)
  }

  /**
   * GET /conversations
   */
  public async find(req: Request, res: Response) {
    const [conversations, count] = await this.repository.findAndCount({
      relations: { consumer: true },
      take: 25,
      skip: 0
    })

    res.json({ count, conversations })
  }

  /**
   * GET /conversations/:conversation-id
   */
  public async findOne(req: Request<{ conversationId: string }>, res: Response) {
    const conversation = await this.repository.findOne({
      relations: { consumer: true },
      where: { id: req.params.conversationId }
    })

    if (conversation) {
      if (req.token.sub.startsWith('consumer:')) {
        if (conversation.consumer.id !== req.token.sub.split(':')[1]) {
          return res.status(403).json({ message: 'Forbidden' })
        }
      }
    }
    else if (!conversation)
      return res.status(404).json({ message: `Not found Conversation with ID ${req.params.conversationId}` })
    
    return res.json(conversation)
  }

  /**
   * PUT /conversations
   */
  public save(req: Request, res: Response): void {
    return void 0
  }

  /**
   * PATCH /conversations
   */
  public update(req: Request, res: Response): void {
    return void 0
  }

  /**
   * DELETE /conversations/:conversation-id
   */
  public async delete(req: Request, res: Response) {
    const conversation = await this.repository.findOne({
      relations: { consumer: true },
      where: { id: req.params.conversationId }
    })

    if (conversation) {
      if (req.token.sub.startsWith('consumer:')) {
        if (conversation.consumer.id !== req.token.sub.split(':')[1]) {
          return res.status(403).json({ message: 'Forbidden' })
        }
      }
    }
    else if (!conversation)
      return res.status(404).json({ message: `Not found Conversation with ID ${req.params.conversationId}` })

    res.json(await this.repository.softRemove(conversation))
  }

  /**
   * POST /conversations/:conversation-id/messages
   */
  public async addMessage(req: Request<{ conversationId: string }>, res: Response) {
    const conversation = await this.repository.findOne({
      relations: { consumer: true },
      where: { id: req.params.conversationId }
    })
    
    if (!conversation)
      return res.status(404).json({ message: `Not found Conversation with ID ${req.params.conversationId}` })

    let user: User | null = null

    if (!req.body.by) req.body.by = req.token.sub.startsWith('user:')
        ? ConversationMessageBy.User
        : req.token.sub.startsWith('consumer:')
          ? ConversationMessageBy.Consumer
          : null

    if (req.body.by === ConversationMessageBy.User) {
      /**
       * Tenta encontrar o usuário que está adicionando a mensagem
       */
      if (req.token.sub.startsWith('user:')) {
        const userId = req.token.sub.split(':')[1]

        user = await database.manager.findOne(User, {
          where: { id: userId }
        })
      } else if (req.body.user) {
        user = await database.manager.findOne(User, {
          where: { id: req.body.user }
        })
      }
      
      if (!user) return res.status(400).json({ message: 'Not Found User' })

      /**
       * Ele só pode adicionar mensagens como usuário se tiver permissão para isso
       */
      if (!req.token.scopes.includes('*')) {
        if (!req.token.scopes.includes('users:*')) {
          if (!req.token.scopes.includes('users:write')) {
            if (!req.token.scopes.includes(`users:${user.id}:*`)) {
              if (!req.token.scopes.includes(`users:${user.id}:write`)) {
                return res.status(403).json({ message: 'Forbidden' })
              }
            }
          }
        }
      }
    } else if (req.body.by === ConversationMessageBy.Consumer) {
      /**
       * Se o token for de um consumidor, ele só pode adicionar mensagens em conversas que ele mesmo criou
       */
      if (req.token.sub.startsWith('consumer:')) {
        const consumerId = req.token.sub.split(':')[1]

        if (conversation.consumer.id !== consumerId)
          return res.status(403).json({ message: 'Forbidden' })
      }
      /**
       * Se ele está autenticado, ele pode adicionar mensagem como consumidor somente se tiver permissão para isso
       */
      else if (req.body.consumer) {
        if (!req.token.scopes.includes('*')) {
          if (!req.token.scopes.includes('consumers:*')) {
            if (!req.token.scopes.includes('consumers:write')) {
              if (!req.token.scopes.includes(`consumers:${conversation.consumer.id}:*`)) {
                if (!req.token.scopes.includes(`consumers:${conversation.consumer.id}:write`)) {
                  return res.status(403).json({ message: 'Forbidden' })
                }
              }
            }
          }
        }
      } else return res.status(400).json({ message: 'Invalid consumer' })
    } else return res.status(400).json({ message: 'Invalid by' })

    const message = await database.manager.save(
      database.manager.create(ConversationMessage, {
        conversation,
        user,
        content: req.body.content,
        by: req.body.by,
      }),
    )

    res.json(message)
  }

  /**
   * GET /conversations/:conversation-id/messages
   */
  public async findMessages(req: Request<{ conversationId: string }>, res: Response) {
    const conversation = await this.repository.findOne({
      relations: { consumer: true },
      where: { id: req.params.conversationId }
    })

    if (conversation) {
      if (req.token.sub.startsWith('consumer:')) {
        if (conversation.consumer.id !== req.token.sub.split(':')[1]) {
          return res.status(403).json({ message: 'Forbidden' })
        }
      }
    }
    else if (!conversation)
      return res.status(404).json({ message: `Not found Conversation with ID ${req.params.conversationId}` })

    const [messages, count] = await database.manager.findAndCount(ConversationMessage, {
      where: { conversation: { id: conversation.id } },
      order: { createdAt: 'DESC' }
    })

    res.json({ count, messages })
  }
}