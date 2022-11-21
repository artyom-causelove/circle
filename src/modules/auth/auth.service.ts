import { Injectable } from '@nestjs/common';

import { Service } from '@core/service';
import { JwtService } from '@core/jwt';

@Injectable()
export class AuthService extends Service {
  constructor(
    private readonly jwtService: JwtService
  ) { super(); }

  sign(UUID: string) {
    return this.jwtService.generateAccessToken({ UUID });
  }
}
