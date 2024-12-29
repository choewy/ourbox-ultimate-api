import { JwtPayload } from 'jsonwebtoken';

export type JwtSignPayload = JwtPayload & {
  id: string;
  originId?: string;
};

export type JwtVerifyResult = {
  ok: boolean;
  payload: JwtSignPayload;
  error: unknown;
  isExpired?: boolean;
};
