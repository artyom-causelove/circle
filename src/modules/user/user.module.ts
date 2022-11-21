import { Module } from '@nestjs/common';

import { ConfigModule } from '@core/config';
import { PrismaModule } from '@core/prisma';
import { JwtModule } from '@core/jwt';

import { PrizeModule } from '@modules/prize';
import { AuthModule } from '@modules/auth';

import { GuardModule } from '@guards/index';

import { UserController } from '@modules/user/user.controller';
import { UserService } from '@modules/user/user.service';

@Module({
  imports: [
    JwtModule,
    GuardModule,
    PrismaModule,
    ConfigModule,
    PrizeModule,
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
