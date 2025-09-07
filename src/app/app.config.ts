import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { MOCK_CONFIG } from './api/mock-api/mock-config';
import { environment } from '../environments/environment';
import { MockInterceptor } from './api/mock-api/mock.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: MOCK_CONFIG,
      useValue: {
        useMock: environment.useMock,
        delay: 300,
        stripApiPrefix: true,
      },
    },
    ...(environment.useMock
      ? [{ provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true }]
      : []),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
  ],
};
