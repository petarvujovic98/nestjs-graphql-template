module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'template',
  password: '',
  database: 'template',
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  cache: 1000,
  seeds: ['src/database/seeds/*.ts'],
  factories: ['src/database/factories/*.ts'],
}
