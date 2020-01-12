import { Field, ID } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

// * this is the base class for all entities

export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  id!: string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdDate!: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  updatedDate!: Date

  @Column({ default: '' })
  @Field()
  createdBy!: string

  @Column({ default: '' })
  @Field()
  lastUpdatedBy!: string
}
