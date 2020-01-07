import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

// * this is the base class for all entities

@ObjectType()
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

  @Column()
  @Field()
  createdBy!: string

  @Column()
  @Field()
  lastUpdatedBy!: string
}
