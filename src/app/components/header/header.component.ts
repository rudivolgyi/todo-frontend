import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isHeaderMenuOpened: boolean = false;

  @Input() user!: User | null;
  @Output() logoutEvent = new EventEmitter();
  @Output() menuEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
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
