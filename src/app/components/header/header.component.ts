import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/auth/user.model';
import { UsersService } from 'src/app/services/backend/auth/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user!: User;

  public isHeaderMenuOpened: boolean = false;
  @Output() logoutEvent = new EventEmitter();
  @Output() menuEvent = new EventEmitter();

  constructor(private usersServie: UsersService) { }

  ngOnInit(): void {
    this.setUser();
  }

  private async setUser(): Promise<any> {

    let token = localStorage.getItem('jwt');
    
    if (token !== null) {
      let email = JSON.parse(window.atob(token.split('.')[1]))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];      

      this.user = await this.usersServie.getByEmail(email);
    }
  }

  public logout(): void {
    this.logoutEvent.emit();
  }

  public toggleMenu(): void {
    this.menuEvent.emit();
  }

  @HostListener("document:click", ["$event"])
  public onClick(event: any) {
    
    if (!this.isHeaderMenuOpened && event.target.id === "headerProfileImage") {
      this.isHeaderMenuOpened = true;
    }
    else {
      this.isHeaderMenuOpened = false;
    }
    
  }

}
