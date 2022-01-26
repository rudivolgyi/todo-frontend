import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-frontend';
  
  public isMenuOpened: boolean = true;

  @ViewChild("menu") menu!: ElementRef;

  constructor(private jwtHelper: JwtHelperService, private router: Router) {

  }

  ngOnInit(): void {
      this.isAuthorized();
  }

  public isAuthorized(): boolean {

    const token: string | null = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  public logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");

    this.router.navigate([""]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (992 <= window.innerWidth) {
      this.isMenuOpened = true;
    }    
  }

  public toggleMenu() {
    if (window.innerWidth < 992) {
      this.isMenuOpened = !this.isMenuOpened;
    }
  }

}
