import { Injectable } from '@nestjs/common'
import DataLoader = require('dataloader')
import { getRepository } from 'typeorm'

import { ILoader } from '../../common'
import { Example } from '../classes'

@Injectable()
export class ExampleLoader implements ILoader {
  public generateDataLoader(): DataLoader<string, Example> {
    return new DataLoader<string, Example>(this.findById)
  }

  private async findById(ids: string[]): Promise<Example[]> {
    const examples = await getRepository(Example).findByIds(ids)
    return ids.map(id => examples.find(example => example.id === id))
  }
}
