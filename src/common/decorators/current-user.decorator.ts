import { createParamDecorator } from '@nestjs/common'

import { ContextUser } from './../dto/context-user.object'

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user as ContextUser,
)
