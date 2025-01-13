import { Transform } from 'class-transformer';
import { DateTime, DateTimeUnit } from 'luxon';

export const ToStartDateTime = (unit: DateTimeUnit = 'day') =>
  Transform(({ obj, key }) => {
    if (!obj[key]) {
      return obj[key];
    }

    const datetime = DateTime.fromJSDate(new Date(obj[key]));

    obj[key] = datetime.isValid ? datetime.startOf(unit) : null;

    return obj[key];
  });

export const ToEndDateTime = (unit: DateTimeUnit = 'day') =>
  Transform(({ obj, key }) => {
    if (!obj[key]) {
      return obj[key];
    }

    const datetime = DateTime.fromJSDate(new Date(obj[key]));

    obj[key] = datetime.isValid ? datetime.endOf(unit) : null;

    return obj[key];
  });
