import { ObjectType, Field } from 'type-graphql'
import { Entity, Column } from 'typeorm'

import { Base } from '../../common'

@Entity()
@ObjectType()
export class Example extends Base {
  @Column({ type: 'text' })
  @Field({ description: 'Just a message as an example' })
  message: string
}
