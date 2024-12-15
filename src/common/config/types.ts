import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

export type ApplicationJwtConfig = {
  accessToken: {
    signOptions: JwtSignOptions;
    verifyOptions: JwtVerifyOptions;
  };
  refreshToken: {
    signOptions: JwtSignOptions;
    verifyOptions: JwtVerifyOptions;
  };
};
