export default {
  host: process.env.PUBSUB_HOST,
  port: parseInt(process.env.PUBSUB_PORT, 10),
  database: process.env.PUBSUB_DATABASE,
  user: process.env.PUBSUB_USERNAME,
  password: process.env.PUBSUB_PASSWORD,
}
