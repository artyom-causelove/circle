import { Prisma, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { PrismaService } from '@core/prisma';
import { Service } from '@core/service';

const userWithPrizes = Prisma.validator<Prisma.UserArgs>()({
  include: { prizes: true }
});
type UserWithPrizes = Prisma.UserGetPayload<typeof userWithPrizes>;

@Injectable()
export class UserService extends Service {
  constructor(
    private readonly prisma: PrismaService
  ) { super(); }

  async getUser(options: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(options) as unknown as Promise<UserWithPrizes>;
  }

  async getUserByVKID(VKID: number) {
    return this.prisma.user.findUnique({ where: { VKID }}) as unknown as Promise<User>;
  }

  async getUserByUUID(UUID: string) {
    return this.prisma.user.findUnique({ where: { UUID }}) as unknown as Promise<User>;
  }

  async createUser(params: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: { ...params, UUID: uuid()}}) as unknown as Promise<User>;
  }

  async putUser(options: Prisma.UserUpdateArgs) {
    return this.prisma.user.update(options) as unknown as Promise<UserWithPrizes>;
  }

  async updateUser(params: Prisma.UserUpdateInput, UUID: string) {
    return this.prisma.user.update({ data: params, where: { UUID }}) as unknown as Promise<User>;
  }
}
