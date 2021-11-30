const coerceIntoArray = <T>(value: T | [T, ...T[]]): T[] =>
  Array.isArray(value) ? value : [value];

export default coerceIntoArray;
