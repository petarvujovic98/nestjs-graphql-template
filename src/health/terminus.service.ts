import { Injectable } from '@nestjs/common'
import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  TerminusModuleOptions,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus'

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    private readonly typeorm: TypeOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        () => this.dns.pingCheck('google', 'https://google.com'),
        () => this.typeorm.pingCheck('database'),
        () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
        () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
        () =>
          this.disk.checkStorage('storage', {
            thresholdPercent: 50,
            path: '/',
          }),
      ],
    }
    return {
      endpoints: [healthEndpoint],
    }
  }
}
