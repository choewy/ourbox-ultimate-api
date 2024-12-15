import * as bcrypt from 'bcrypt';

export class PasswordVO {
  private readonly _value: string;

  constructor(plainText: string | null, value: string = null) {
    switch (true) {
      case !!value:
        this._value = value;
        break;

      case !!plainText:
        this._value = bcrypt.hashSync(plainText, 10);
        break;

      default:
        this._value = null;
    }
  }

  public valueOf() {
    return this._value;
  }

  compare(plainText: string) {
    return bcrypt.compareSync(plainText, this._value);
  }
}
