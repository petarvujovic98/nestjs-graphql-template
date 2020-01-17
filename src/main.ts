import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import * as fastifyCompress from 'fastify-compress'
import * as fastifyHelmet from 'fastify-helmet'
import * as fastifyRateLimit from 'fastify-rate-limit'
import { AppModule } from './app.module'
import { GqlAuthGuard } from './auth/gql.guard'

declare const module: any

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({ logger: true })
  fastifyAdapter.register(fastifyCompress)
  fastifyAdapter.register(fastifyHelmet)
  fastifyAdapter.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
  })

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  )

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalGuards(new GqlAuthGuard())

  await app.listen(3000, '0.0.0.0')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
