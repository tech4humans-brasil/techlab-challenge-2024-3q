import { Request, Response } from "express";
import { Consumer } from "../entities/Consumer.js";
import { database } from "../services/database.js";
import { Conversation } from "../entities/Conversation.js";
import jwt from 'jsonwebtoken'
import { APP_NAME, SECRET } from "../constants/env.js";
import { FindOptionsWhere } from "typeorm";
import { ConversationMessage, ConversationMessageBy } from "../entities/ConversationMessage.js";
export class ConsumersController {
  protected get repository() {
    return database.getRepository(Consumer)
  }

  /**
   * GET /consumers
   */
  public async find(req: Request, res: Response) {
    const [consumers, count] = await this.repository.findAndCount({
      take: 25,
      skip: 0
    })

    res.json({ count, consumers })
  }

  /**
   * PUT /consumers/sign-in
   */
  public async signIn(req: Request, res: Response) {
    if (typeof req.body != 'object') throw new Error('Bad Request: body must be an object')

    if (typeof req.body.document != 'string') throw new Error('Bad Request: body.document must be a string')

    let consumer = await this.repository.findOne({
      where: { document: req.body.document }
    })

    if (!consumer) consumer = await this.repository.save(
      this.repository.create({ document: req.body.document })
    )

    const accessToken = await new Promise<string>((resolve, reject) => {
      jwt.sign(
        { scopes: [] },
        SECRET,
        {
          audience: APP_NAME,
          issuer: APP_NAME,
          expiresIn: '10m',
          subject: `consumer:${consumer.id}`
        },
        (err, token) => {
          if (err) return reject(err)

          if (!token) return reject(new Error())

          resolve(token)
        }
      )
    })

    res.json({ access_token: accessToken, token_type: 'Bearer', expires_in: 3600 })
  }

  /**
   * GET /consumers/:consumer-id
   */
  public async findOne(req: Request<{ consumerId: string }>, res: Response) {
    const consumer = await this.repository.findOne({
      where: { id: req.params.consumerId }
    })
    
    if (!consumer) return res.status(404).json({ message: `Not found Consumer with ID ${req.params.consumerId}` })
    
    return res.json(consumer)
  }

  /**
   * GET /consumers/:consumer-id/conversations
   */
  public async findConversations(req: Request<{ consumerId: string }>, res: Response) {
    const consumer = await this.repository.findOne({
      where: { id: req.params.consumerId }
    })
    
    if (!consumer) return res.status(404).json({ message: `Not found Consumer with ID ${req.params.consumerId}` })

    const filters: FindOptionsWhere<Conversation> = {}

    const [conversations, count] = await database.getRepository(Conversation).findAndCount({
      where: { ...filters, consumer: { id: consumer.id } }
    })
    
    return res.json({ count, conversations })
  }

  /**
   * PUT /consumers
   */
  public async save(req: Request, res: Response) {
    const consumer = await this.repository.save(req.body)

    res.json(consumer)
  }

  /**
   * PATCH /consumers/:consumer-id
   */
  public async update(req: Request<{ consumerId: string }>, res: Response) {
    const consumer = await this.repository.findOne({
      where: { id: req.params.consumerId }
    })

    if (!consumer) return res.status(404).json({ message: `Not found Consumer with ID ${req.params.consumerId}` })

    await this.repository.save(
      this.repository.merge(consumer, req.body)
    )

    res.json(consumer)
  }

  /**
   * DELETE /consumers/:consumer-id
   */
  public async delete(req: Request<{ consumerId: string }>, res: Response) {
    const consumer = await this.repository.findOne({
      where: { id: req.params.consumerId }
    })

    if (!consumer) return res.status(404).json({ message: `Not found Consumer with ID ${req.params.consumerId}` })

    await this.repository.remove(consumer)

    res.json(consumer)
  }

  /**
   * POST /consumers/:consumer-id/conversations
   */
  public async addConversation(req: Request<{ consumerId: string }>, res: Response) {
    const consumer = await this.repository.findOne({
      where: { id: req.params.consumerId }
    })

    if (!consumer)
      return res.status(404).json({ message: `Not found Consumer with ID ${req.params.consumerId}` })

    const messages: Record<string, unknown>[] = Array.isArray(req.body?.messages) ? req.body.messages : []

    const conversation = await database.getRepository(Conversation).save({
      consumer,
      messages: messages.map((message, index) => {
        if (typeof message !== 'object') throw new Error('Bad Request: messages must be an array of objects')

        if (typeof message.content !== 'string') throw new Error(`Bad Request: req.body.messages.${index}.content must be a string`)

        if (typeof message.by !== 'string') throw new Error(`Bad Request: req.body.messages.${index}.by must be a string`)

        if (!Object.values(ConversationMessageBy).includes(message.by as ConversationMessageBy))
          throw new Error(`Bad Request: req.body.messages.${index}.by must be one of ${Object.values(ConversationMessageBy).join(', ')}`)

        if (typeof message.createdAt !== 'string') throw new Error(`Bad Request: req.body.messages.${index}.createdAt must be a string`)

        const createdAt = new Date(message.createdAt)

        if (isNaN(createdAt.getTime())) throw new Error(`Bad Request: req.body.messages.${index}.createdAt must be a valid date`)
        
        return database.getRepository(ConversationMessage).create({
          content: message.content,
          by: message.by as ConversationMessageBy,
          createdAt,
        })
      }),
      subject: req.body.subject,
    })

    res.status(201)
      .header('Location', `/conversations/${conversation.id}`)
      .json(conversation)
  }
}