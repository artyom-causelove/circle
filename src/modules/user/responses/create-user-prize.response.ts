import { Expose, Type } from 'class-transformer';

import { AppResponse } from '@core/response/classes';

import { SafePrize } from '@modules/prize/interfaces';

export class CreateUserPrizeResponse extends AppResponse {
  @Expose()
  @Type(() => SafePrize)
  declare data: SafePrize;
}
