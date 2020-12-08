import { Type } from '@nestjs/common'
import { Field, ObjectType, Int } from '@nestjs/graphql'

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string

    @Field(() => classRef)
    node: T
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[]

    @Field(() => [classRef], { nullable: true })
    nodes: T[]

    @Field(() => Int)
    totalCount: number

    @Field()
    hasNextPage: boolean
  }

  return PaginatedType
}
