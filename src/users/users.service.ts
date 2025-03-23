import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(body: UserSignUpDto): Promise<Omit<UserEntity, 'password'>> {
    try {
      // ✅ 1. Check if the user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: body.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // ✅ 2. Hash the password
      const hashedPassword = await bcrypt.hash(body.password, 10); // 10 = salt rounds

      // ✅ 3. Create a new user with the hashed password
      const user = this.userRepository.create({
        ...body,
        password: hashedPassword, // Replace plain password with hashed password
      });

      // ✅ 4. Save user to the database
      const savedUser = await this.userRepository.save(user);

      // ✅ 5. Delete the password field before returning the user
      delete savedUser.password;

      return savedUser;
    } catch (error) {
      console.error('Error during signup:', error);
      throw new InternalServerErrorException('Signup failed');
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
