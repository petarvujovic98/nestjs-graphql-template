import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

// * configuration object for the database
export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    entities: [process.env.TYPEORM_ENTITIES],
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    migrations: [process.env.TYPEORM_MIGRATIONS],
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
    cli: {
      migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    },
    cache: {
      duration: parseInt(process.env.TYPEORM_CACHE_DURATION, 10),
    },
    autoLoadEntities: true,
  }),
)
