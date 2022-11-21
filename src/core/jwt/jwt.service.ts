import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import { AccessTokenDto } from '@core/jwt/dto';
import { ConfigService } from '@core/config';

@Injectable()
export class JwtService {
  constructor(
    private readonly configService: ConfigService
  ) {}

  generateAccessToken(params: AccessTokenDto): string {
    const expiresIn = Number(this.configService.env.jwtExpiresIn) || 2 * 24 * 60 * 60;
    return sign(params, this.configService.env.jwtSecretKey, { expiresIn });
  }

  decode(jwtToken: string): [unknown, Error] {
    const jwtSecretKey = this.configService.env.jwtSecretKey;
    const jwtExpiresIn = this.configService.env.jwtExpiresIn;
    try {
      const data = verify(jwtToken, jwtSecretKey, { expiresIn: jwtExpiresIn });
      return [data, null];
    } catch (e) {
      return [null, new Error('Bad token')];
    }
  }
}
