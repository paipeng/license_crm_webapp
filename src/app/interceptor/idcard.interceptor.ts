import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StorageService } from '../service/storage.service';
import { catchError } from 'rxjs/internal/operators';

@Injectable()
export class IdcardInterceptor implements HttpInterceptor {

  constructor(
    private storage: StorageService,
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json; charset=utf-8')
    });

    if (this.storage.getItem('token') && this.storage.getItem('token').token) {
      req = req.clone({
        headers: req.headers.set('Authorization', this.storage.getItem('token').token)
      });
    }

    const isLogin = req.url.endsWith('/login');
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => this.handleData(err, isLogin))
    );
  }

  private handleData(event: HttpResponse<any> | HttpErrorResponse, isLogin: boolean): Observable<any> {
    switch (event.status) {
      case 0:
        this.logout();
        return of(event);
      case 401:
        if (!isLogin) {
          this.logout();
          return of(event);
        }
        break;
      default:
    }

    return throwError(event);
  }

  private logout() {
    this.storage.removeItem('token');
    this.storage.removeItem('user');

    window.location.href = '/login/1';
  }
}
