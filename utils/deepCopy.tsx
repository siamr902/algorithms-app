export function deepCopy<T>(arr: T): T {
  return JSON.parse(JSON.stringify(arr));
};
