import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { ContextUser } from '../dto/context-user.object'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super(configService.get('jwt.passport'))
  }

  async validate(payload: any): Promise<ContextUser> {
    return new ContextUser(
      payload.sub,
      payload.username,
      payload.email,
      payload.firstName,
      payload.lastName,
      payload.roles,
    )
  }
}
