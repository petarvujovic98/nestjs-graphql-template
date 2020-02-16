import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Example } from './classes'

@Injectable()
export class ExampleService {
  constructor(
    // TODO                 <-- declare your typeorm injections here
    @InjectRepository(Example)
    private readonly exampleRepository: Repository<Example>,
  ) {}

  // TODO                 <-- define service constructor and methods

  async example(): Promise<Example> {
    const example = new Example()
    example.message = 'Hello World!'
    return example
  }
}
