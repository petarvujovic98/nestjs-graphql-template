import { registerAs } from '@nestjs/config'
// * configuration object for the pub sub server
export default registerAs('pubsub', () => ({
  host: process.env.PUBSUB_HOST,
  port: parseInt(process.env.PUBSUB_PORT, 10),
  database: process.env.PUBSUB_DATABASE,
  user: process.env.PUBSUB_USERNAME,
  password: process.env.PUBSUB_PASSWORD,
}))
