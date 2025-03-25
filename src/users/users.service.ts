import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

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

  async signin(userSignInDto: UserSignInDto) {
    const userExists = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password') // Explicitly select password field
      .where('user.email = :email', { email: userSignInDto.email })
      .getOne();

    if (
      !userExists ||
      !(await bcrypt.compare(userSignInDto.password, userExists.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return userExists;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async accessToken(user: UserEntity) {
    if (!process.env.ACCESS_TOKEN_SECRET_KEY) {
      throw new Error(
        'Missing ACCESS_TOKEN_SECRET_KEY in environment variables',
      );
    }
    
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '1h' },
    );
  }
}
