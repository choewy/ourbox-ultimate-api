import { Transform } from 'class-transformer';

export const ToQueryOrderBy = () =>
  Transform(({ obj, key }) => {
    obj[key] = typeof obj[key] === 'string' ? obj[key].toUpperCase() : obj[key];

    return obj[key];
  });
