import { Module } from '@nestjs/common';

import { ConfigModule } from '@core/config';

import { JwtService } from '@core/jwt/jwt.service';

@Module({
  imports: [ConfigModule],
  providers: [JwtService],
  controllers: [],
  exports: [JwtService]
})
export class JwtModule {}
