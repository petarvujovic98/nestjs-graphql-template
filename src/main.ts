import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import fastifyCompress = require('fastify-compress')
import fastifyHelmet = require('fastify-helmet')
import fastifyRateLimit = require('fastify-rate-limit')

import { AppModule } from './app.module'

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

  const port = parseInt(process.env.PORT, 10)
  await app.listen(port || 3000, '0.0.0.0')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
