import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/models/auth/login.model';
import { BackendService } from '../../backend.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "Auth/";

  constructor(private http: HttpClient) { }

  public async login(loginModel: Login): Promise<any> {
    return this.http.post<any>(BackendService.url + this.url + "Login", loginModel, { 
      headers: new HttpHeaders({ 
        "Content-Type": "application/json"
      })
    }).toPromise();
  }

  public async refresh(credentials: string): Promise<any> {
    return this.http.post<any>(BackendService.url + this.url + "Refresh", credentials, { 
      headers: new HttpHeaders({ 
        "Content-Type": "application/json"
      })
    }).toPromise();
  }

}
