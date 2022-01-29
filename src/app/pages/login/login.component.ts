import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/auth/login.model';
import { LoginService } from 'src/app/services/backend/auth/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginModel: Login = new Login();
  public invalidLogin: boolean = false;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public async login(): Promise<any> {
      try {
        let response = await this.loginService.login(this.loginModel);

        if (response.token === null && response.refreshToken === null) {
          this.invalidLoginProcess();
          return;
        }

        const token = response.token;
        const refreshToken = response.refreshToken;      
        localStorage.setItem("jwt", token);
        localStorage.setItem("refreshToken", refreshToken);
        
        this.invalidLogin = false;

        await this.loginService.setUser();
        this.router.navigate(["/workspaces/all"]);
      }
      catch {
        this.invalidLoginProcess();
        return;
      }
  }

  private invalidLoginProcess(){
    this.invalidLogin = true;

    setTimeout(
      () => {
        this.invalidLogin = false;
      }, 4000);
  }

  public showPlaceholder(event: any) {

    if (this.loginModel.password.length === 0) {
      event.target.type = "text";
    }
    else {
      event.target.type = "password";
    }

  }

  public hidePlaceholder(event: any) {
    event.target.type = "password";
  }

  public isReadyToLogin() {

    if (this.loginModel.email.length !== 0 && this.loginModel.password.length !== 0) {
      this.login();
    }
  }

}
