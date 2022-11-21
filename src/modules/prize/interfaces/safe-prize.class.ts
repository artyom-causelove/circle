import { Prize, PrizeType } from '@prisma/client';
import { Expose } from 'class-transformer';

export class SafePrize implements Omit<Prize, 'date' | 'UUID' | 'probability'> {
  @Expose()
  link: string | null;
  
  @Expose()
  promocode: string;

  @Expose()
  type: PrizeType;

  @Expose()
  title: string;
  
  @Expose()
  degree: number;
  
  @Expose()
  description: string;
}
