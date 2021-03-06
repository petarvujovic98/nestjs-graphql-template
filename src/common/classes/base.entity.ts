import { Field, ID } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

// * this is the base class for all entities

export abstract class Base {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID, { description: 'ID of the object' })
  id!: number

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Field({ description: 'Date when the object was created' })
  createdDate!: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Field({ description: 'Date when the object was last updated' })
  updatedDate!: Date

  @Column({ default: '' })
  @Field({ description: 'User that created the object' })
  createdBy!: string

  @Column({ default: '' })
  @Field({ description: 'User that last updated the object' })
  lastUpdatedBy!: string
}
