import DataLoader = require('dataloader')

export interface ILoader {
  generateDataLoader(): DataLoader<any, any>
}
