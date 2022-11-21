import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';

import { AccessTokenDto } from '@core/jwt/dto';
import { JwtService } from '@core/jwt';
import { Request } from '@core/request';

import { UserService } from '@modules/user';
import { ResponseDto } from '@core/response/dto';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService:  JwtService
  ) {}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    let method = null;
    let token = null;

    if (request.headers.authorization) {
      [method, token] = request.headers.authorization.split(' ');
    } else {
      throw new HttpException(
        new ResponseDto(null, null, ['Empty authorization header'], false),
        400
      );
    }
    
    if (token) {
      const [data, error] = this.jwtService.decode(token);
      if (error) {
        throw new HttpException(
          new ResponseDto(null, null, ['Invalid bearer token'], false),
          400
        );
      }

      const { UUID } = data as AccessTokenDto;
      const user = await this.userService.getUser({ where: { UUID }});
      if (!user) {
        throw new HttpException(
          new ResponseDto(null, null, ['Invalid bearer token'], false),
          400
        );
      }

      request.user = user;
      return true;
    }

    throw new HttpException(new ResponseDto(null, null, ['Empty bearer token']), 400);
  }
}
