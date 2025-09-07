import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  Observable,
  of,
  from,
  isObservable,
  delay,
  mergeMap,
  throwError,
} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MockRegistry } from './mock-registry.service';
import { MockContext, MockResult, MockRoute } from './mock-types';
import { MOCK_CONFIG, MockConfig } from './mock-config';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  private isMockInited = false;
  constructor(
    @Inject(MOCK_CONFIG) private cfg: MockConfig,
    private registry: MockRegistry,
  ) {}

  private async ensureInitialized(): Promise<void> {
    if (this.isMockInited || !this.cfg.useMock) return Promise.resolve();
    const mod = await import('./registrars/registrars.index');
    mod.bootstrapMocks(this.registry);
    this.isMockInited = true;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.cfg.useMock) return next.handle(req);
    return from(this.ensureInitialized()).pipe(
      switchMap(() => {
        const route: MockRoute = this.findRoute(req);
        if (!route) return next.handle(req);

        const context: MockContext = this.makeContext(req, route.pattern);
        const response = route.handler(context);
        return this.toObservable(response).pipe(
          mergeMap((res) => this.toHttpEvent(req.urlWithParams, res)),
          delay(this.cfg.delay),
        );
      }),
    );
  }

  private findRoute(req: HttpRequest<any>) {
    const routes: MockRoute[] = this.registry.getRoutes();
    const endpoint = this.extractEndpoint(req.urlWithParams);
    const method = req.method.toUpperCase();
    return routes.find(
      (r) =>
        (!r.method || r.method.toUpperCase() === method) &&
        r.pattern.test(endpoint),
    );
  }

  private makeContext(req: HttpRequest<any>, pattern: RegExp): MockContext {
    const url = req.urlWithParams;
    const endpoint = this.extractEndpoint(url);
    const params = this.paramsToObject(req);
    const match = endpoint.match(pattern)!;
    return { url, endpoint, method: req.method, params, body: req.body, match };
  }

  private toObservable<T>(x: T | Promise<T> | Observable<T>): Observable<T> {
    if (isObservable(x)) return x;
    if (x instanceof Promise) return from(x);
    return of(x);
  }

  private paramsToObject(req: HttpRequest<any>): Record<string, any> {
    const out: Record<string, any> = {};
    if (!req.params) return out;
    for (const k of req.params.keys()) {
      const all = req.params.getAll(k) ?? [];
      out[k] = all.length > 1 ? all : (all[0] ?? req.params.get(k));
    }
    return out;
  }

  private extractEndpoint(url: string): string {
    const u = new URL(url, 'http://localhost');
    let path = u.pathname;
    if (this.cfg.stripApiPrefix && path.startsWith('/api/'))
      path = path.substring(5);
    if (path.startsWith('/')) path = path.substring(1);
    return path;
  }

  private toHttpEvent(
    url: string,
    result: MockResult,
  ): Observable<HttpEvent<any>> {
    let status = 200;
    let body: any = result;
    let headersObj: Record<string, string> | undefined;
    if (
      result &&
      typeof result === 'object' &&
      ('body' in result || 'status' in result || 'headers' in result)
    ) {
      const r: any = result;
      status = r.status ?? 200;
      body = r.body;
      headersObj = r.headers;
    }
    const headers = new HttpHeaders(headersObj ?? {});

    if (status >= 200 && status < 300) {
      return of(
        new HttpResponse({ url, status, statusText: 'OK', headers, body }),
      );
    }

    const statusText = this.statusTextFor(status);
    return throwError(
      () =>
        new HttpErrorResponse({
          url,
          status,
          statusText,
          headers,
          error: body,
        }),
    );
  }

  private statusTextFor(code: number): string {
    if (code === 400) return 'Bad Request';
    if (code === 401) return 'Unauthorized';
    if (code === 403) return 'Forbidden';
    if (code === 404) return 'Not Found';
    if (code === 409) return 'Conflict';
    if (code === 422) return 'Unprocessable Entity';
    if (code >= 500) return 'Server Error';
    return 'Error';
  }
}
