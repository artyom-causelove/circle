import { IResponse } from '@core/response/interfaces';

export class ResponseDto<T extends IResponse> implements IResponse {
  data: T['data'] = null;
  error: string[] = null;
  status = true;
  meta = null;

  constructor(data?: T['data'], meta?: T['meta'], error?: string[], status?: boolean) {
    data && (this.data = data);
    meta && (this.meta = meta);
    error && (this.error = error);
    status !== undefined && (this.status = status);
  }
}
