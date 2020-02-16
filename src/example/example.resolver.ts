import { Resolver, Query } from '@nestjs/graphql'

import { Example } from './classes'
import { ExampleService } from './example.service'

@Resolver('Example') // TODO       <-- define resolver type
export class ExampleResolver {
  constructor(private readonly exampleService: ExampleService) {}

  // TODO                 <-- define queries, mutations and subscriptions

  @Query(() => [Example], { description: 'Example resolver' })
  async example(): Promise<Example> {
    return await this.exampleService.example()
  }
}
