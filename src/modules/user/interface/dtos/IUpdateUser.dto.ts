import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';

export class IUpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, {
    message: 'Invalid birth date',
  })
  birth_date: Date;

  @Matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/, {
    message: 'Invalid document',
  })
  @IsNotEmpty()
  document: string;

  @IsOptional()
  @Length(6, 16, { message: 'Password must be at least 8 characters' })
  password: string;
}
