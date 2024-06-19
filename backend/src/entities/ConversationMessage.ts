import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Conversation } from "./Conversation.js";
import { User } from "./User.js";

export enum ConversationMessageBy {
  Consumer = 'consumer',
  User = 'user',
  System = 'system',
}

@Entity('conversation_messages')
@Index(() => ({ conversation: 1, createdAt: -1 }))
export class ConversationMessage {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column('text')
  public content!: string

  @Column('enum', { enum: ConversationMessageBy })
  public by!: ConversationMessageBy

  @ManyToOne(() => Conversation, { nullable: false })
  @JoinColumn()
  public conversation!: Relation<Conversation>

  @ManyToOne(() => User)
  @JoinColumn()
  public user!: User | null

  @CreateDateColumn()
  public createdAt!: Date
}
