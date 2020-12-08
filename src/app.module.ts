import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { main } from './config'
import { ExampleModule } from './example/example.module'
import { HealthCheckModule } from './health/healthCheck.module'

import { LoaderInterceptor, ComplexityPlugin } from '@common'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: main,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('graphql'),
      inject: [ConfigService],
    }),
    AuthModule,
    HealthCheckModule,
    ExampleModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoaderInterceptor }, ComplexityPlugin],
})
export class AppModule {}
