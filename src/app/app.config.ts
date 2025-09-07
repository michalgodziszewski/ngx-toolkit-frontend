import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { provideHttpMocks } from 'ngx-toolkit/http-mock';
import { appRegistrarsLoader } from './api/mock-api/app-registrars-loader';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    ...provideHttpMocks({
      useMock: environment.useMock,
      delay: 300,
      stripApiPrefix: true,
      registrarsLoader: appRegistrarsLoader,
    }),

    provideZoneChangeDetection({ eventCoalescing: true }),

    provideHttpClient(withInterceptorsFromDi()),

    provideRouter(routes),
  ],
};
