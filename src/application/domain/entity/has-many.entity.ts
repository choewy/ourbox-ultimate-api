import { Transform } from 'class-transformer';

export class HasManyEntity {
  id: string;

  @Transform(({ value }) => (typeof value === 'boolean' ? value : Number(value) > 0))
  has: boolean;
}
