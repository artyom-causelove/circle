import { Module } from '@nestjs/common';

import { JwtModule } from '@core/jwt';

import { AuthService } from '@modules/auth/auth.service';

@Module({
  imports: [JwtModule],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
