import { Expose } from 'class-transformer';

import { IMeta, IResponse } from '@core/response/interfaces';

export class AppResponse implements IResponse {
  data: unknown;
  
  @Expose()
  meta: IMeta;

  @Expose()
  error: string[];

  @Expose()
  status: boolean;
}