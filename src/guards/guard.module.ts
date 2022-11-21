import { Module } from '@nestjs/common';

import { PrismaModule } from '@core/prisma';
import { JwtModule } from '@core/jwt';

import { UserService } from '@modules/user';

import { JwtGuard } from '@guards/jwt.guard';
import { SelfGuard } from '@guards/self.guard';

const SelfGuardFactory = {
  useFactory: SelfGuard,
  provide: Symbol()
};

/** @todo extend errors in guards */
@Module({
  imports: [
    PrismaModule,
    JwtModule
  ],
  controllers: [],
  providers: [JwtGuard, SelfGuardFactory, UserService],
  exports: [JwtGuard, SelfGuardFactory]
})
export class GuardModule {}
