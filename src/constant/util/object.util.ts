// TODO 호출부 삭제하고 직접 값 집어넣을 것
/**
 * @deprecated
 */
export class ObjectUtil<Entity, Target> {
  constructor(
    private readonly entity: Entity,
    private readonly target: Target,
  ) {}

  getValue(propertyKey: (keyof Entity & keyof Target) | string) {
    const key = propertyKey as string;

    if (this.target[key] === undefined) {
      return undefined;
    }

    if (this.target[key] === this.entity[key]) {
      return undefined;
    }

    return this.target[key];
  }

  getValues() {
    const values: Partial<Entity> = {};
    const keys = Object.keys(this.target);

    for (const key of keys) {
      values[key] = this.getValue(key);
    }

    return values;
  }
}
