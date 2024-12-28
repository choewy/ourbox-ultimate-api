import { ValueTransformer } from 'typeorm';

import { PasswordVO } from '../vo/password.vo';

export class PasswordColumnTransformer implements ValueTransformer {
  from(value: string): PasswordVO {
    return new PasswordVO(null, value);
  }

  to(vo: PasswordVO | string): string {
    if (typeof vo === 'string') {
      vo = new PasswordVO(vo);
    }

    return vo.valueOf();
  }
}
