import { Transform } from 'class-transformer';

export const Trim = () =>
  Transform(({ obj, key }) => {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim();
    }

    return obj[key];
  });
