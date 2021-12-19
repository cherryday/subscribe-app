export interface JwtPayload {
  readonly email: string;
  readonly iat: number;
  readonly exp: number;
}
