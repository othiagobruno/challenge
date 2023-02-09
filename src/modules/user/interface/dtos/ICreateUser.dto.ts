import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

export class ICreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

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

  @IsBoolean()
  @IsNotEmpty()
  accepted_terms: boolean;

  @Length(6, 16, { message: 'Password must be at least 8 characters' })
  @IsNotEmpty()
  password: string;
}
