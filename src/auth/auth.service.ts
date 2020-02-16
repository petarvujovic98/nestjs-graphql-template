import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { ContextUser } from '../common'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validate(token: string): ContextUser {
    try {
      const payload = this.jwtService.verify(token)
      return new ContextUser(
        payload.sub,
        payload.username,
        payload.email,
        payload.firstName,
        payload.lastName,
        payload.roles,
      )
    } catch (error) {
      throw new ForbiddenException(
        'The JSON Web token supplied is not authentic',
      )
    }
  }
}
