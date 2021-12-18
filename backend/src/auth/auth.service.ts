import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { PasswordCrypt } from './password-crypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordCrypt: PasswordCrypt,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.usersService.findByEmail(loginUserDto.email);

    if (!user) {
      throw new BadRequestException('wrong email or password');
    }

    const isValidPassword = await this.passwordCrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('wrong email or password');
    }

    const payload = { email: user.email };
    return this.jwtService.sign(payload);
  }

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.findByEmail(registerUserDto.email);

    if (user) {
      throw new BadRequestException('user with this email already exists');
    }

    const hashedPassword = await this.passwordCrypt.hash(
      registerUserDto.password,
    );

    const createdUser = await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
    });

    const payload = { email: createdUser.email };
    return this.jwtService.sign(payload);
  }
}
