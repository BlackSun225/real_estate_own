import { Role_name } from '../../generated/prisma/enums';

export interface JwtPayload {
  sub: string;
  role: Role_name;
  token: string;
}