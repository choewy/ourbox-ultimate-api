export const createOperationDescription = (val: string | number | Array<any>) => {
  if (val instanceof Array) {
    val = val.join('`, `');
  }

  return `\`${val}\``;
};
