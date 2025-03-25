
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignInDto {


  @IsNotEmpty({ message: 'email can not be empty. ' })
  @IsEmail({}, { message: 'Please  Provide  a valid email .' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be empty. ' })
  @MinLength(5, { message: 'Password minium character should be  5.' })
  password: string;
}