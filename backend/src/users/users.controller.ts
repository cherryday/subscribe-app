import { Controller, Get, UseGuards } from '@nestjs/common';
import { Payload } from 'src/auth/decorator/payload.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserPayload } from 'src/auth/interface/user-payload.interface';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('self')
  @UseGuards(JwtAuthGuard)
  getSelf(@Payload() payload: UserPayload): Promise<User> {
    return this.usersService.findByEmail(payload.email);
  }
}
