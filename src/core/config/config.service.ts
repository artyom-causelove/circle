import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { RawEnvironmentFieldMap } from '@core/config/field-maps';
import { RawEnvironment, Environment } from '@core/config/classes';

@Injectable()
export class ConfigService {
  private environment: Environment = null;

  configure() {
    const raw = dotenv.config().parsed as unknown as RawEnvironment;
    this.environment = this.mapFields(raw, RawEnvironmentFieldMap);
    return this;
  }

  private mapFields(raw: RawEnvironment, map: typeof RawEnvironmentFieldMap) {
    return Object.entries(raw).reduce(
      (acc, v) => ({ ...acc, [map[v[0]]]: v[1]}),
      {}
    ) as Environment;
  }

  get env() {
    return this.environment;
  }
}
