import { Exclude, Expose } from 'class-transformer';
import { User } from '@prisma/client';

@Exclude()
export class SafeUser implements Omit<User, 'UUID' | 'VKID'> {
  @Expose()
  isAuth: boolean;
}
