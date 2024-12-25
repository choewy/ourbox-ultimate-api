import { registerDecorator, ValidationOptions } from 'class-validator';

export const CONTACT_FORMAT_REGEXP = new RegExp(/^\d{2,3}-\d{3,4}-\d{4}$/);

export const isContactFormat = (val: unknown) => typeof val === 'string' && CONTACT_FORMAT_REGEXP.test(val);

export function IsContactFormat(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isContactFormat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { message: `${propertyName} is not contact format`, ...validationOptions },
      validator: {
        validate(value: unknown) {
          return isContactFormat(value);
        },
      },
    });
  };
}
