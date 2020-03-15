import { Repository, EntityRepository } from 'typeorm'

import { Example } from './../classes/example.entity'

@EntityRepository(Example)
export class ExampleRepository extends Repository<Example> {
  async justAnExample(): Promise<Example> {
    const existing = await this.findOne({ cache: true })
    if (existing) {
      return existing
    }
    const example = new Example()
    example.message = 'Hello'
    return await this.save(example)
  }
}
