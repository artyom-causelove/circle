import { Expose } from 'class-transformer';
import { User } from '@prisma/client';

import { AppResponse } from '@core/response/classes';

export class CreateUserResponse extends AppResponse {
  @Expose()
  declare data: User;
}
