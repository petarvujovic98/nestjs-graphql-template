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

  canActivate(context: ExecutionContext) {
    const roles = new Reflector().get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    const request = this.getRequest(context)
    const authHeader = request.headers.authorization as string

    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.')
    }
    const [type, token] = authHeader.split(' ')
    if (type !== 'JWT') {
      throw new BadRequestException(
        `Authentication type 'JWT' required. Found '${type}'`,
      )
    }
    const user = this.authService.validate(token)
    if (user) {
      request.user = user
      return user && user.roles && user.hasRole(roles)
    }
    throw new UnauthorizedException(user)
  }

  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req
  }
}
