export const environment = {
  production: true,
  // Relative path assumes the frontend is served behind a reverse proxy that
  // forwards /api/ to the Django backend. Override at build time if needed.
  apiUrl: '/api/v1',
};
