import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workspace } from 'src/app/models/content/workspaces/workspace.model';
import { WorkspacesService } from 'src/app/services/backend/content/workspaces/workspaces.service';

@Component({
  selector: 'app-workspaces-detailed',
  templateUrl: './workspaces-detailed.component.html',
  styleUrls: ['./workspaces-detailed.component.css']
})
export class WorkspacesDetailedComponent implements OnInit {

  public workspace!: Workspace;

  constructor(private route: ActivatedRoute, private workspacesService: WorkspacesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {

      if (p !== undefined && p.id !== undefined) {
        this.getWorkspace(p.id);
      }

    });
  }

  private async getWorkspace(id: string): Promise<any> {
    this.workspace = await this.workspacesService.getOne(id);
  }

}
