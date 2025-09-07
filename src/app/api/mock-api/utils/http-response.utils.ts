export type HeadersMap = Record<string, string>;

export const ok = (body: any, headers?: HeadersMap) =>
  ({ status: 200, body, headers }) as const;

export const created = (body: any, headers?: HeadersMap) =>
  ({ status: 201, body, headers }) as const;

export const noContent = (headers?: HeadersMap) =>
  ({ status: 204, body: null, headers }) as const;

export const badRequest = (message = 'Bad request', extra?: any) =>
  ({ status: 400, body: { message, ...(extra ?? {}) } }) as const;

export const unauthorized = (message = 'Unauthorized') =>
  ({ status: 401, body: { message } }) as const;

export const forbidden = (message = 'Forbidden') =>
  ({ status: 403, body: { message } }) as const;

export const notFound = (message = 'Not found') =>
  ({ status: 404, body: { message } }) as const;

export const internalError = (message = 'Internal error') =>
  ({ status: 500, body: { message } }) as const;
