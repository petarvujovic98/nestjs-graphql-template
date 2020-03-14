import { registerAs } from '@nestjs/config'

// * configuration object for the app
export default registerAs('app', () => ({
  port: parseInt(process.env.MAIN_PORT, 10),
  origins: [process.env.ORIGINS.split(',')],
}))
