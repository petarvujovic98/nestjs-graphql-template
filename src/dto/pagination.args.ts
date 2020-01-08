import { IsInt, Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class PaginationArgs {
  @Field(type => Int, { nullable: true })
  @IsInt({ message: 'Skip argument must be integer!' })
  @Min(1, { message: 'Skip must not be less then 0!' })
  skip?: number = 0

  @Field(type => Int, { nullable: true })
  @IsInt({ message: 'Take argument must be integer!' })
  @Min(1, { message: 'Take must not be less then 0!' })
  take?: number = 10
}