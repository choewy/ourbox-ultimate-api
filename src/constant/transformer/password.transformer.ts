import { Transform } from 'class-transformer';
import { ValueTransformer } from 'typeorm';

import { PasswordVO } from '../vo/password.vo';

export class PasswordColumnTransformer implements ValueTransformer {
  from(value: string): PasswordVO {
    return new PasswordVO(null, value);
  }

  to(vo: PasswordVO): string {
    return vo.valueOf();
  }
}

export const toPasswordVO = (value: string) => new PasswordVO(value);
export const ToPasswordVO = () => Transform(({ obj, key }) => new PasswordVO(obj[key]));
