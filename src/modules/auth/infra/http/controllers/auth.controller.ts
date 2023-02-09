import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/modules/auth/decorators/rules';
import { ILoginDTO } from 'src/modules/auth/dtos/ILogin.dto';
import { ILoginResponse } from 'src/modules/auth/dtos/ILoginResponse';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post()
  async login(@Body() data: ILoginDTO): Promise<ILoginResponse> {
    return this.authService.login(data);
  }
}
