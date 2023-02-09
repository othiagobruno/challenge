import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ILoginDTO } from '../dtos/ILogin.dto';
import { ILoginResponse } from '../dtos/ILoginResponse';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: ILoginDTO): Promise<ILoginResponse> {
    const user = await this.userService.getOnlyPassword(email);
    const checkPassword = await bcrypt.compare(password, user?.password || '');

    if (!checkPassword) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.password = undefined;

    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
