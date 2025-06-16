import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels()
export class SignupDto extends CreateUserDto {}
