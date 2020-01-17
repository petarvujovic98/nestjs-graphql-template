import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { ContextUser } from '../dto/context-user.object'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const roles = new Reflector().get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    const request = this.getRequest(context)
    const user: ContextUser = request.user
    return (
      super.canActivate(new ExecutionContextHost([request])) &&
      user &&
      user.roles &&
      user.hasRole(roles)
    )
  }

  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req
  }
}
