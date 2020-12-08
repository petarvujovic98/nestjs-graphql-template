import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ClientOpts } from 'redis'

// * configuration object for the database
export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: +process.env.TYPEORM_PORT,
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    entities: [process.env.TYPEORM_ENTITIES],
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    migrations: [process.env.TYPEORM_MIGRATIONS],
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
    keepConnectionAlive: true,
    cli: {
      migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    },
    cache: {
      type: 'redis',
      options: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      } as ClientOpts,
    },
    autoLoadEntities: true,
  }),
)
