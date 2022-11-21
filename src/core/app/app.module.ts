import { Module } from '@nestjs/common';

import { ConfigModule } from '@core/config';

import { AuthModule } from '@modules/auth';
import { UserModule } from '@modules/user';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
