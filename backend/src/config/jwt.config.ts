import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET_KEY,
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
}));
