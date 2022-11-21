import { Module } from '@nestjs/common';

import { ConfigService } from '@core/config/config.service';

/** @todo migrate to nest.js config */
@Module({
  imports: [],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
