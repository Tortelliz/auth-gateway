import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])/, {
    message:
      'password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;
}

export class ForgotPasswordDto {
  @IsString()
  @Length(6, 6)
  @IsNotEmpty()
  token: string;
  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])/, {
    message:
      'new password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  new_password: string;
  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])/, {
    message:
      'confirm password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  confirm_password: string;
}

export class FirstAccessDto extends ForgotPasswordDto {}

export class EmailVerificationDto {
  @IsString()
  @Length(6, 6)
  @IsNotEmpty()
  token: string;
}
