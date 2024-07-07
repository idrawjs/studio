export function parseBasePath(path: string) {
  let basePath = path;

  if (window.location.pathname.startsWith('/studio')) {
    basePath = `/studio${path}`;
  }

  return basePath;
}
