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
import { catchError, tap } from 'rxjs/internal/operators';

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
        headers: req.headers.set('Authorization', 'Bearer ' + this.storage.getItem('token').token)
      });
    }

    const isLogin = req.url.endsWith('/login');
    return next.handle(req).pipe(

      /*
      tap(event => {
      if (event instanceof HttpResponse) {

        console.log(" all looks good");
        // http response status code
        console.log(event.body);
      }
    }, error => {
      // http response status code
      console.log("----response----");
      console.error("status code:");
      console.error(error.status);
      console.error(error.message);
      console.log("--- end of response---");

    }),
    */
      catchError(err =>
        this.handleData(err, isLogin)
      )
    );
  }

  private handleData(event: HttpResponse<any> | HttpErrorResponse, isLogin: boolean): Observable<any> {
    console.error('handleData: ' + event.status);
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
