import { registerAs } from '@nestjs/config'
import { FastifyRateLimitOptions } from 'fastify-rate-limit'

// * configuration object for the app
export default registerAs('app', () => ({
  port: parseInt(process.env.MAIN_PORT, 10),
  origins: [process.env.ORIGINS.split(',')],
  secret: process.env.SECRET,
  rateLimit: {
    max: process.env.RATE_LIMIT,
    timeWindow: process.env.TIME_WINDOW,
  } as FastifyRateLimitOptions,
}))
