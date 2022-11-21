import { RawEnvironmentFieldMap } from '@core/config/field-maps';

type IRawEnvironmentField = {[K in keyof typeof RawEnvironmentFieldMap]: unknown };

export class RawEnvironment implements IRawEnvironmentField {
  REQUIRED_PRIZE_UUID: string;
  DATABASE_URL: string;
  SERVER_PORT: number;
  MORGAN_MODE: 'tiny';
  SERVER_IP: string;
  JWT_EXPIRES_IN: number;
  JWT_SECRET_KEY: string;
}
