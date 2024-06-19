import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { profiles } from "../constants/profiles.js";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column({ unique: true })
  public username!: string

  @Column({ unique: true })
  public email!: string

  @Column()
  public password!: string

  @Column('enum', { enum: Object.keys(profiles) })
  public profile!: keyof typeof profiles

  @CreateDateColumn()
  public createdAt!: Date

  @DeleteDateColumn()
  public deletedAt!: Date | null
}
