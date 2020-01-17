import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import configs from './config/'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
  ],
  providers: [AppService, AppResolver],
  exports: [AppService],
})
export class AppModule {}
