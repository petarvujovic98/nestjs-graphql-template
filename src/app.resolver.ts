import { Resolver } from '@nestjs/graphql'
import { PostgresPubSub } from 'graphql-postgres-subscriptions'
import { ConfigService } from 'nestjs-config'
import { AppService } from './app.service'

@Resolver() // TODO       <-- define resolver type
export class AppResolver {
  private pubsub: PostgresPubSub

  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {
    this.pubsub = new PostgresPubSub(this.configService.get('pubsub'))
  }

  // TODO                 <-- define queries, mutations and subscriptions
}
