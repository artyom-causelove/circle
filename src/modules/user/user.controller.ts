import { Body, Controller, HttpCode, Post, UseGuards, Patch, Response, Query, ParseEnumPipe, HttpException } from '@nestjs/common';
import { TransformPlainToClass } from 'class-transformer';
import { FastifyReply } from 'fastify';
import { User } from '@prisma/client';

import { RestController } from '@core/controller';
import { ResponseDto } from '@core/response/dto';

import { SelfGuard, JwtGuard } from '@guards/index';

import {
  PatchUserIsAuthResponse,
  CreateUserPrizeResponse,
  CreateUserResponse
} from '@modules/user/responses';
import { CreateUserDto, PatchUserIsAuthDto } from '@modules/user/dto';
import { RequestUser } from '@modules/user/decorators';
import { PrizeService } from '@modules/prize';
import { AuthService } from '@modules/auth';

import { UserService } from '@modules/user/user.service';

export enum Directions {
  OGE = 'ОГЭ',
  EGE = 'ЕГЭ'
}

@Controller('users')
export class UserController extends RestController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly prizeService: PrizeService
  ) { super(); }

  @Post()
  @HttpCode(201)
  @TransformPlainToClass(CreateUserResponse, { excludeExtraneousValues: true })
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Response({ passthrough: true }) response: FastifyReply
  ): Promise<ResponseDto<CreateUserResponse>> {
    const isExist = await this.userService.getUserByVKID(createUserDto.VKID);
    if (isExist) {
      response.status(403);
      return new ResponseDto(null, null, ['User is already exist'], false);
    }

    const user = await this.userService.createUser({ ...createUserDto, isAuth: true });
    const token = this.authService.sign(user.UUID);
    return new ResponseDto(user, { token });
  }

  @Patch(':userUUIDorVKID/is-auth')
  @HttpCode(200)
  @UseGuards(SelfGuard('userUUIDorVKID'))
  @TransformPlainToClass(PatchUserIsAuthResponse, { excludeExtraneousValues: true })
  async patchUser(
    @RequestUser() user: User,
    @Body() authUserDto: PatchUserIsAuthDto
  ): Promise<ResponseDto<PatchUserIsAuthResponse>> {
    const token = this.authService.sign(user.UUID);
    const updatedUser = await this.userService.updateUser({ isAuth: authUserDto.isAuth }, user.UUID);
    return new ResponseDto(updatedUser, { token });
  }

  @Post(':userUUID/prizes')
  @HttpCode(201)
  @UseGuards(JwtGuard, SelfGuard('userUUID'))
  @TransformPlainToClass(CreateUserPrizeResponse, { excludeExtraneousValues: true })
  async createUserPrize(
    @RequestUser() user: User,
    @Body() { params }: any,
    @Query('direction', new ParseEnumPipe(Directions)) direction: Directions
  ): Promise<ResponseDto<CreateUserPrizeResponse>> {
    const prizes = await this.prizeService.getUserPrizes(user.UUID);
    const todayPrizes = await this.prizeService.getDayPrizes(new Date());
    const existPrizes = await this.prizeService.getExistPhysicalPrizes();
    const existPrizeUUIDs = existPrizes.map(prize => prize.UUID);
    let newPrize = null;
    const prize = await this.prizeService.getNewPrize(todayPrizes, prizes, direction);
    if (existPrizeUUIDs.includes(prize.UUID)) {
      newPrize = prize;
    }
    
    await this.prizeService.givePrize(newPrize, user);
    return new ResponseDto(newPrize);
  }
}
