import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consumer } from "./Consumer.js";
import { ConversationMessage } from "./ConversationMessage.js";
import { User } from "./User.js";

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column()
  public subject!: string

  @ManyToOne(() => Consumer, { nullable: false })
  @JoinColumn()
  public consumer!: Consumer

  @ManyToOne(() => User)
  @JoinColumn()
  public user!: User | null

  @OneToMany(() => ConversationMessage, message => message.conversation, { cascade: ['insert'] })
  public messages!: ConversationMessage[]

  @CreateDateColumn()
  public createdAt!: Date

  @DeleteDateColumn()
  public deletedAt!: Date | null
}
