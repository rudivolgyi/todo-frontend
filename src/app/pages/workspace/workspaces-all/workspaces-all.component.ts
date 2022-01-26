import { Component, OnInit } from '@angular/core';
import { Workspace } from 'src/app/models/content/workspaces/workspace.model';
import { WorkspacesService } from 'src/app/services/backend/content/workspaces/workspaces.service';

@Component({
  selector: 'app-workspaces-all',
  templateUrl: './workspaces-all.component.html',
  styleUrls: ['./workspaces-all.component.css']
})
export class WorkspacesAllComponent implements OnInit {

  public workspaces: Array<Workspace> = [];

  constructor(private workspacesService: WorkspacesService) { }

  ngOnInit(): void {
    this.getWorkspaces();
  }

  private async getWorkspaces(): Promise<any> {
    this.workspaces = await this.workspacesService.getAll();
  }

}
