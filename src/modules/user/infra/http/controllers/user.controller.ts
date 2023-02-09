import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IsPublic } from 'src/modules/auth/decorators/rules';
import { ICreateUserDto } from 'src/modules/user/interface/dtos/ICreateUser.dto';
import { IUpdateUserDto } from 'src/modules/user/interface/dtos/IUpdateUser.dto';
import { IUser } from 'src/modules/user/interface/models/IUser';
import { UserService } from 'src/modules/user/services/user.service';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async create(@Body() user: ICreateUserDto): Promise<IUser> {
    return this.userService.create(user);
  }

  @IsPublic()
  @Get()
  async findAll(): Promise<IUser[]> {
    return this.userService.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IUser> {
    return this.userService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: IUpdateUserDto,
  ): Promise<IUser> {
    return this.userService.update(Number(id), user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<IUser> {
    return this.userService.delete(Number(id));
  }
}
