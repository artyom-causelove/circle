import { IsBoolean, IsObject, IsOptional } from 'class-validator';

import { SafeUser } from '@modules/user/classes';

export class PatchUserIsAuthDto implements Partial<Pick<SafeUser, 'isAuth'>> {
  @IsBoolean()
  @IsOptional()
  isAuth?: boolean;

  @IsObject()
  params: any;
}
