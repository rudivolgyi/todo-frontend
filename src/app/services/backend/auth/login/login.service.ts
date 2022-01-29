import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Login } from 'src/app/models/auth/login.model';
import { User } from 'src/app/models/auth/user.model';
import { BackendService } from '../../backend.service';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "Auth/";

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private http: HttpClient, private usersService: UsersService) { 
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }

  public async login(loginModel: Login): Promise<any> {
    return this.http.post<any>(BackendService.url + this.url + "Login", loginModel, { 
      headers: new HttpHeaders({ 
        "Content-Type": "application/json"
      })
    }).toPromise();
  }

  public async setUser(): Promise<any> {

    let token = localStorage.getItem('jwt');
    
    if (token !== null) {
      let email = JSON.parse(window.atob(token.split('.')[1]))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

      let user = await this.usersService.getByEmail(email);

      this.userSubject.next(user);
    }
    else {
      this.userSubject.next(null);
    }
  }

  public async refresh(credentials: string): Promise<any> {
    return this.http.post<any>(BackendService.url + this.url + "Refresh", credentials, { 
      headers: new HttpHeaders({ 
        "Content-Type": "application/json"
      })
    }).toPromise();
  }

  public logout(): void {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");

    this.userSubject.next(null);
  }

}
