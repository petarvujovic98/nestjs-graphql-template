import { Injectable } from '@nestjs/common'

import { Example } from './classes'
import { ExampleRepository } from './repositories/example.repository'

@Injectable()
export class ExampleService {
  constructor(
    // TODO                 <-- declare your typeorm injections here
    private readonly exampleRepository: ExampleRepository,
  ) {}

  // TODO                 <-- define service constructor and methods

  async example(): Promise<Example> {
    return await this.exampleRepository.justAnExample()
  }
}
