import {inject, Injectable} from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpContext
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {LoaderService} from "../services/loader.service";
import { HttpContextToken } from '@angular/common/http';

export const SKIP_LOADER = new HttpContextToken<boolean>(() => false);

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private readonly loaderService = inject(LoaderService)

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const skip = req.context.get(SKIP_LOADER);
    if (!skip) {
      this.loaderService.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (!skip) this.loaderService.hide();
      })
    );
  }
}
