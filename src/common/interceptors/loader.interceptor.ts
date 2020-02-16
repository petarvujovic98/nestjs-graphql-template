import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

import { ExampleLoader } from '../../example/loaders/example.loader'

@Injectable()
export class LoaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context).getContext()

    const loaders = {
      ExampleLoader: new ExampleLoader().generateDataLoader(),
    }

    Object.keys(loaders).forEach(key => (ctx[key] = loaders[key]))

    return next.handle()
  }
}
