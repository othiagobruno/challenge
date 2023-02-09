import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { IUser } from '../interface/models/IUser';
import { ICreateUserDto } from '../interface/dtos/ICreateUser.dto';
import { IUpdateUserDto } from '../interface/dtos/IUpdateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: ICreateUserDto): Promise<IUser> {
    if (!data.accepted_terms) {
      throw new HttpException(
        'You must accept the terms of use',
        HttpStatus.BAD_REQUEST,
      );
    }

    const find = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (find) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        birth_date: new Date(data.birth_date),
        password: passwordHash,
      },
    });

    delete user.password;

    return user;
  }

  async update(id: number, data: IUpdateUserDto): Promise<IUser> {
    const find = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!find) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (data.password) {
      const passwordHash = await bcrypt.hash(data.password, 10);
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...data,
          birth_date: new Date(data.birth_date),
          password: passwordHash,
        },
      });
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        birth_date: new Date(data.birth_date),
      },
    });

    delete user.password;

    return user;
  }

  async delete(id: number): Promise<IUser> {
    const find = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!find) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.prisma.user.delete({
      where: { id },
    });

    delete user.password;

    return user;
  }

  async findMany(): Promise<IUser[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOne(id: number): Promise<IUser> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    delete user.password;

    return user;
  }

  async getOnlyPassword(
    email: string,
  ): Promise<Pick<IUser, 'id' | 'password'>> {
    return await this.prisma.user.findUnique({
      where: { email },
      select: { password: true, id: true },
    });
  }
}
