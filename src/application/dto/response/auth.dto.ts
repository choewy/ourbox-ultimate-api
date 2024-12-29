import { ApiResponseProperty } from '@nestjs/swagger';

import { JwtSignPayload } from '../types';
import { JwtSignPayloadDTO } from './jwt-sign-payload.dto';
import { UserDTO } from './user.dto';

import { User } from '@/application/domain/entity/user.entity';

export class AuthDTO {
  @ApiResponseProperty({ type: () => UserDTO })
  user: UserDTO;

  @ApiResponseProperty({ type: () => UserDTO })
  origin: UserDTO;

  @ApiResponseProperty({ type: () => JwtSignPayloadDTO })
  payload: JwtSignPayloadDTO;

  constructor(payload: JwtSignPayload, user: User, origin?: User) {
    this.user = new UserDTO(user);
    this.origin = origin ? new UserDTO(origin) : null;
    this.payload = new JwtSignPayloadDTO(payload);
  }
}
