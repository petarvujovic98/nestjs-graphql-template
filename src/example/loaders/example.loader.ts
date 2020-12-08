import { Injectable } from '@nestjs/common'
import DataLoader from 'dataloader'
import { getRepository } from 'typeorm'

import { Example } from '../classes'

import { ILoader } from '@common'

@Injectable()
export class ExampleLoader implements ILoader {
  public generateDataLoader(): DataLoader<number, Example> {
    return new DataLoader<number, Example>(this.findById)
  }

  private async findById(ids: number[]): Promise<Example[]> {
    const examples = await getRepository(Example).findByIds(ids)
    return ids.map((id) => examples.find((example) => example.id === id))
  }
}
