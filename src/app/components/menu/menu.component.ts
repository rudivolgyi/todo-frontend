import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() menuEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public toggleMenu(): void {
    this.menuEvent.emit();
  }

}
