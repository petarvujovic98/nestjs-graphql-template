import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import compression from 'fastify-compress'
import fastifyCookie from 'fastify-cookie'
import cors from 'fastify-cors'
// import csrf from 'fastify-csrf'
import helmet from 'fastify-helmet'
import rateLimit from 'fastify-rate-limit'

import { AppModule } from './app.module'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: { prettyPrint: true } }),
  )

  const configService = app.get(ConfigService)

  app.register(helmet)
  app.register(compression, { encodings: ['gzip', 'deflate'] })
  app.register(rateLimit, configService.get('app.rateLimit'))
  app.register(fastifyCookie, { secret: configService.get('app.secret') })
  // app.register(csrf, { cookieOpts: { signed: true } })
  app.register(cors, { origin: configService.get('app.origins') })

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(configService.get('app.port') || 3000, '0.0.0.0')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
