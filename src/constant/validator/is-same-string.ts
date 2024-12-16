import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsSameString(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isSameString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: { message: `${propertyName} is not same with ${property}`, ...validationOptions },
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          return typeof value === 'string' && typeof relatedValue === 'string' && value === relatedValue;
        },
      },
    });
  };
}
