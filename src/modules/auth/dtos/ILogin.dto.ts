import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class ILoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
