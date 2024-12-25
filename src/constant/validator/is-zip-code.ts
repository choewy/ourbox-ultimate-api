import { registerDecorator, ValidationOptions } from 'class-validator';

export const ZIP_CODE_REGEXP = new RegExp(/^\d{5}(\d{1})?$|^\d{3}-\d{3}$/);

export const isZipCode = (val: unknown) => typeof val === 'string' && ZIP_CODE_REGEXP.test(val);

export function IsZipCode(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isZipCode',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { message: `${propertyName} is not zip code format`, ...validationOptions },
      validator: {
        validate(value: unknown) {
          return isZipCode(value);
        },
      },
    });
  };
}
