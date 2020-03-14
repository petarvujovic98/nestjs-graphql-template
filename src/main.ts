import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import fastifyCompress = require('fastify-compress')
import fastifyHelmet = require('fastify-helmet')
import fastifyRateLimit = require('fastify-rate-limit')
import fastifyCookie = require('fastify-cookie')
import fastifyCors = require('fastify-cors')

import { AppModule } from './app.module'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: { prettyPrint: true } }),
  )

  const configService = app.get(ConfigService)

  app.register(fastifyCompress)
  app.register(fastifyHelmet)
  app.register(fastifyRateLimit, {
    max: configService.get('rateLimit.max'),
    timeWindow: configService.get('rateLimit.timeWindow'),
  })
  app.register(fastifyCookie)
  app.register(fastifyCors, { origin: configService.get('app.origins') })

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(configService.get('app.port') || 3000, '0.0.0.0')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
