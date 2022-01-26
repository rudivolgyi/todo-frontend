import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/backend/content/workspaces/workspaces.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private workspacesService: WorkspacesService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  private async getTodos(): Promise<any> {
    let x = await this.workspacesService.getAll();

    console.log(x);
  }

}
