import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../backend/auth/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private loginService: LoginService) { }

  async canActivate(route: ActivatedRouteSnapshot) {

    const token = localStorage.getItem("jwt");
    
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(token);

    if (!isRefreshSuccess) {
      localStorage.removeItem("jwt");
      this.loginService.setUser();
      this.router.navigate([""]);
    }
    
    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string | null): Promise<boolean> {

    const refreshToken: string | null = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return false;
    }

    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
    let isRefreshSuccess: boolean;

    try {
      const response = await this.loginService.refresh(credentials);
      const newToken = response.body.accessToken;
      const newRefreshToken = response.body.refreshToken;
      localStorage.setItem("jwt", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      isRefreshSuccess = true;
    }
    catch (ex) {      
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }

}
