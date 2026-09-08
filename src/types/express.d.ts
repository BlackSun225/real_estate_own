import { JwtPayload } from '../auth/types/json-payload.type';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export {};