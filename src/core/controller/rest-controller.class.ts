import { IResponse } from '@core/response/interfaces';
import { Service } from '@core/service';

export class RestController {
  [key: string]: (
    ((...args) => IResponse | Promise<IResponse>) |
    (number | string | boolean | symbol | unknown[] | Record<number | string | symbol, unknown> | Service)
  );
}
