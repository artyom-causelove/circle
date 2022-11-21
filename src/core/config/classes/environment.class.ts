import { EnvironmentFieldMap } from '@core/config/field-maps';

type IEnvironmentField = {[K in keyof typeof EnvironmentFieldMap]: unknown };

export class Environment implements IEnvironmentField {
  requiredPrizeUUID: string;
  databaseUrl: string;
  serverPort: number;
  morganMode: 'tiny';
  serverIP: string;
  jwtExpiresIn: number;
  jwtSecretKey: string;
}
