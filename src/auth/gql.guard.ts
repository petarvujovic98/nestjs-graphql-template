import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

import { AuthService } from './auth.service'

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = new Reflector().get<string[]>('roles', context.getHandler())
    const request = this.getRequest(context)
    const authHeader = request.headers.authorization as string

    if (!authHeader) {
      if (roles) {
        throw new BadRequestException('Authorization header not found.')
      }
      return true
    }

    const [type, token] = authHeader.split(' ')
    if (type !== 'JWT' && roles) {
      throw new BadRequestException(`Authentication type 'JWT' required. Found '${type}'`)
    }

    const user = this.authService.validate(token)

    if (user || !roles) {
      request.user = user
      return !roles
        ? true
        : user && user.roles && user.roles.some(role => roles.includes(role))
    }
    throw new UnauthorizedException(user)
  }

  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req
  }
}
