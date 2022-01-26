import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
    return next.handle(req.clone({ 
      setHeaders: {
        'Authorization': 'Bearer ' + this.getToken()
      }
    }));
  }

  private getToken(): string {

    let token = localStorage.getItem("jwt");

    if (token === null) {
      return "";
    }

    return token;
  }

}
