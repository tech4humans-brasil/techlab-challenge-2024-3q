export interface IConversationMessage {
  id: string
  content: string
  by: 'consumer' | 'system' | 'user'
  createdAt: string
}