let basePath = '/static/material';

if (window.location.pathname.startsWith('/studio')) {
  basePath = `/studio${basePath}`;
}

export { basePath };
