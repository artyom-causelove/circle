import { Module } from '@nestjs/common';

import { PrismaModule } from '@core/prisma';
import { ConfigModule } from '@core/config';

import { PrizeService } from '@modules/prize/prize.service';
import { VKModule } from 'vk-provider';

@Module({
  imports: [
    PrismaModule,
    VKModule,
    ConfigModule
  ],
  controllers: [],
  providers: [PrizeService],
  exports: [PrizeService]
})
export class PrizeModule {}
