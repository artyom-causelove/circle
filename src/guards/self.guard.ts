import { CanActivate, ExecutionContext, HttpException, Inject, mixin } from '@nestjs/common';
import { validate } from 'uuid';

import { Request } from '@core/request';

import { UserService } from '@modules/user';
import { ResponseDto } from '@core/response/dto';

export const SelfGuard = (paramName: string) => {
  class SelfGuardMixin implements CanActivate {
    constructor(@Inject(UserService) private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest() as Request;
      let userUUID = null;
      let userVKID = null;

      try {
        if (validate(request.params[paramName])) {
          userUUID = request.params[paramName];
        } else {
          userVKID = parseInt(request.params[paramName]);
          if (isNaN(userVKID)) throw Error('VKID is NaN');
        }
      } catch {
        throw new HttpException(
          new ResponseDto(null, null, ['Invalid user UUID or VKID param'], false),
          400
        );
      }
      
      let user = request.user;
      if (!user && userVKID !== null) {
        user = await this.userService.getUserByVKID(userVKID);
        request.user = user;
      }
      if (!user) {
        user = await this.userService.getUserByUUID(userUUID);
        request.user = user;
      }
      
      if (user.UUID === userUUID || user.VKID === userVKID) {
        return true;
      }
  
      throw new HttpException(
        new ResponseDto(null, null, ['User does not have access'], false),
        403
      );
    }
  }

  return mixin(SelfGuardMixin);
}
