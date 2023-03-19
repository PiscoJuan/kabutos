import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    //return next.handle(request);
    return next.handle(request).pipe(timeout(30000), 
    catchError((error: HttpErrorResponse) => {
      return throwError({ error: error.name, message: error.message});
    })) as Observable<HttpEvent<unknown>>
  }
}
