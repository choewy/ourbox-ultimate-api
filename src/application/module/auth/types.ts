export type VerifyJwtResult = {
  ok: boolean;
  id: string;
  error: unknown;
  isExpired?: boolean;
};
