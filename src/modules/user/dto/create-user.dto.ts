import { IsNumber, IsObject } from 'class-validator';
import { User } from '@prisma/client';

import { SafeUser } from '@modules/user/classes';

export class CreateUserDto implements Omit<SafeUser, 'isAuth'>, Pick<User, 'VKID'> {
  @IsNumber()
  VKID: number;

  @IsObject()
  params: any;
}
