import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Example } from './classes/example.entity'
import { ExampleResolver } from './example.resolver'
import { ExampleService } from './example.service'

@Module({
  imports: [TypeOrmModule.forFeature([Example])],
  providers: [ExampleService, ExampleResolver],
})
export class ExampleModule {}
