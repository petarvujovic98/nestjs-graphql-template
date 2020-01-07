import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { resolve } from 'path'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
