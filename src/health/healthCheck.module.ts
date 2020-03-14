import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { TerminusOptionsService } from './terminus.service'

@Module({
  imports: [TerminusModule.forRootAsync({ useClass: TerminusOptionsService })],
  providers: [TerminusOptionsService],
})
export class HealthCheckModule {}
