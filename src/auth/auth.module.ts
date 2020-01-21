import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { GqlAuthGuard } from './gql.guard'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('jwt'),
      inject: [ConfigService],
    }),
  ],
  providers: [GqlAuthGuard, AuthService],
  exports: [GqlAuthGuard, AuthService],
})
export class AuthModule {}
