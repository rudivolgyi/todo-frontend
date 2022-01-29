import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/auth/user.model';
import { LoginService } from './services/backend/auth/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-frontend';
  
  public user!: User | null;
  public isMenuOpened: boolean = true;

  @ViewChild("menu") menu!: ElementRef;

  constructor(private router: Router, private loginService: LoginService) {
      this.loginService.user.subscribe(x => {
        
        this.user = x;

        if (!x) {
          this.router.navigate([""]);
        }
      });
  }

  ngOnInit(): void {
  }

  public logout() {
    this.loginService.logout();
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
