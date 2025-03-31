import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from '../utility/decorators/current-user-decorators';
// import { AuthenticationGuard } from '../utility/guard/autnenication.guard';
import { AuthorizationGuard } from '../utility/guard/authorization.guard';

import { SetRoles } from '../utility/decorators/authorization-role.decorator';
import { Roles } from '../db/migrations/user-roles.enum';
import { AuthenticationGuard } from '../utility/guard/autnenication.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(
    @Body() userSignUpDto: UserSignUpDto,
  ): Promise<{ user: Omit<UserEntity, 'password'> }> {
    return { user: await this.usersService.signup(userSignUpDto) };
  }

  @Post('signin')
  async signin(@Body() userSignInDto: UserSignInDto) {
    console.log('================');
    const user = await this.usersService.signin(userSignInDto); // 🛠️ Add await
    const accessToken = await this.usersService.accessToken(user);
    return { accessToken, user };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

   @UseGuards(AuthenticationGuard, AuthorizationGuard([Roles.ADMIN]))
  // @SetRoles('admin') // ✅ Restrict this route to admins only
  @Get('all')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new NotFoundException('Invalid user ID');
    }
    return this.usersService.findOne(userId);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  async getProfile(@CurrentUser() currentUser: UserEntity) {
    console.log('Entered getProfile controller', currentUser);
    console.log('📌 Controller - Received Current User:', currentUser);
    if (!currentUser || !currentUser.id || isNaN(Number(currentUser.id))) {
      throw new UnauthorizedException('Invalid or missing user ID');
    }
    return currentUser;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
