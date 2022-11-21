import { Expose } from 'class-transformer';
import { User } from '@prisma/client';

import { AppResponse } from '@core/response/classes';

export class PatchUserIsAuthResponse extends AppResponse {
  @Expose()
  declare data: User;
}
