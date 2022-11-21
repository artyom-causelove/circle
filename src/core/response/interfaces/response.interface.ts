import { IMeta } from '@core/response/interfaces/meta.interface';

export interface IResponse {
  data: unknown;
  meta: IMeta;
  error: string[];
  status: boolean;
}
