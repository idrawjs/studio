let topPrefix = 'idraw-studio';

export function setClassNameTopPrefix(prefix: string) {
  topPrefix = prefix;
}

export function getClassNameTopPrefix(): string {
  return topPrefix;
}

export function createPrefixName(
  modName: string
): (...args: string[]) => string {
  return (...args: string[]) => {
    return [topPrefix, modName, ...args].join('-');
  };
}

export function getPrefixName(...args: string[]) {
  return [topPrefix, ...args].join('-');
}
