import { Injectable } from '@angular/core';
import { Workspace } from 'src/app/models/content/workspaces/workspace.model';
import { BackendService } from '../../backend.service';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesService {

  private url: string = "Workspaces/";

  constructor(private backendService: BackendService) { }

  public async getOne(id: string): Promise<Workspace> {
    return this.backendService.getRequest(this.url + "GetOne/" + id);
  }

  public async getAll(): Promise<Array<Workspace>> {
    return this.backendService.getRequest(this.url + "GetAll");
  }

  /*public async getByWorkspace(id: string): Promise<Array<Workspace>> {
    return this.backendService.getRequest(this.url + "GetByWorkspace/" + id);
  }*/

  public async upload(workspace: Workspace): Promise<any> {
    return this.backendService.postRequest(this.url + "Upload", workspace);
  }

  public async edit(id: string, workspace: Workspace): Promise<any> {
    return this.backendService.putRequest(this.url + "Edit/" + id, workspace);
  }

  public async delete(id: string): Promise<any> {
    return this.backendService.deleteRequest(this.url + "Delete/" + id);
  }
}
