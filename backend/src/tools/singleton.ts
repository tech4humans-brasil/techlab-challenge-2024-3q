const instances = new Map<unknown, unknown>();

export function singleton<T>(Constructor: new () => T) {
  if (!instances.has(Constructor)) instances.set(Constructor, new Constructor());

  return instances.get(Constructor) as T;
}
