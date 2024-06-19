import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('consumers')
export class Consumer {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column('character varying', { nullable: true })
  public firstName!: string | null

  @Column('character varying', { nullable: true })
  public lastName!: string | null

  @Column('character varying', { unique: true })
  public document!: string

  @Column('timestamp without time zone', { nullable: true })
  public birthDate!: Date | null

  @CreateDateColumn()
  public createdAt!: Date

  @UpdateDateColumn()
  public updatedAt!: Date
}
