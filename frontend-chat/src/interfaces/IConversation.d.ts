import { IConsumer } from "./IConsumer.js"

export interface IConversation {
  id: string
  subject: string
  consumer: IConsumer
}
