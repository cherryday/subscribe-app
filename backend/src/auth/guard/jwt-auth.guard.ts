import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { JwtRequest } from '../interface/jwt-request.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<JwtRequest>();

    try {
      const token = request.headers.authorization.split('Bearer ')[1];
      const payload = this.jwtService.verify<JwtPayload>(token);
      request.payload = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
