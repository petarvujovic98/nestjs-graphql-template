import { ObjectType, Field } from '@nestjs/graphql'
import { Entity, Column } from 'typeorm'

import { Base } from '@common'

@Entity()
@ObjectType()
export class Example extends Base {
  /**
   * Just a message as an example
   */
  @Column({ type: 'text' })
  @Field({ description: 'Just a message as an example', complexity: 1 })
  message: string
}
