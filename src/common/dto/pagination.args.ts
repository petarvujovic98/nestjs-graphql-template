import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsInt, Min } from 'class-validator'

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, {
    nullable: true,
    description: 'Number of items to skip from query result',
  })
  @IsInt({ message: 'Skip argument must be integer!' })
  @Min(1, { message: 'Skip must not be less then 0!' })
  skip?: number = 0

  @Field(() => Int, {
    nullable: true,
    description: 'Number of items to take from query result',
  })
  @IsInt({ message: 'Take argument must be integer!' })
  @Min(1, { message: 'Take must not be less then 0!' })
  take?: number = 10
}
