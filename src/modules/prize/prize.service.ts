import { Prisma, Prize, PrizeType, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@core/prisma';
import { Service } from '@core/service';
import { Directions } from '@modules/user';
import { VKProvider } from 'vk-provider';

@Injectable()
export class PrizeService extends Service {
  constructor(
    private readonly prisma: PrismaService,
    private readonly providerVK: VKProvider
  ) { super() }

  getExistPhysicalPrizes() {
    return this.prisma.prize.findMany({
      where: {
        users: { none: {}},
        type: 'physical'
      }
    });
  }

  getPrize(where: Prisma.PrizeWhereUniqueInput) {
    return this.prisma.prize.findUnique({ where });
  }

  getPrizes(options: Prisma.PrizeFindManyArgs) {
    return this.prisma.prize.findMany(options);
  }

  getUserPrizes(userUUID: string) {
    return this.prisma.prize.findMany({
      where: {
        users: { every: { UUID: userUUID }}
      }
    });
  }

  getDayPrizes(date: Date) {
    const todayDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    const nextDate  = new Date(todayDate);
    nextDate.setDate(todayDate.getDate() + 1);
    
    return this.prisma.prize.findMany({
      where: {
        OR: [{
            date: null
          }, {
            AND: [
              { date: { gte: todayDate }},
              { date: { lt: nextDate }}
            ]
          }
        ]
      }
    });
  }

  async getNewPrize(prizes: Prize[], existPrizes: Prize[], direction: Directions): Promise<Prize> {
    if (prizes.length === 0) {
      return null;
    }

    const probas = prizes.map(prize => prize.probability * 100);
    const dice = Math.random();
    const ranges = [] as number[];
    let sum = 0;

    probas.slice(0, probas.length - 1).forEach((prob, index) => {
      sum += prob / 100.0;
      ranges[index] = sum;
    });

    let resultIndex = 0;
    for (resultIndex = 0; resultIndex < ranges.length && dice >= ranges[resultIndex]; resultIndex++);
    const resultPrize = prizes[resultIndex];
    if (resultPrize.description?.includes('${direction}')) {
      resultPrize.description = resultPrize.description.replace('${direction}', direction);
    }
    
    if (resultPrize.link) {
      resultPrize.link = direction === 'ЕГЭ' ? resultPrize.link['EGE'] : resultPrize.link['OGE'];
    }

    return resultPrize;
  }

  givePrize(prize: Prize, user: User) {
    if (prize.type === PrizeType.physical) {
      const client = this.providerVK.createClient({
        token: process.env.VK_SECRET,
        version: '5.131'
      });
      client.sendMessage({
        groupId: process.env.VK_GROUP,
        userId: process.env.VK_USER,
        message: `https://vk.com/id${user.VKID} выиграл ${prize.title}`
      });
    }

    return this.prisma.prize.update({
      data: {
        users: {
          connect: { UUID: user.UUID }
        }
      },
      where: {
        UUID: prize.UUID
      }
    });
  }
}
