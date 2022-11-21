import { IsNumber, IsString } from 'class-validator';

export class AccessTokenDto {
  @IsString()
  UUID: string;

  @IsNumber()
  iat?: number;

  @IsNumber()
  exp?: number;
}
