import { Injectable } from '@angular/core';
import { SubTask } from 'src/app/models/content/tasks/subTasks/subTask.model';
import { BackendService } from '../../backend.service';

@Injectable({
  providedIn: 'root'
})
export class SubTasksService {

  private url: string = "SubTasks/";

  constructor(private backendService: BackendService) { }

  public async getOne(id: string): Promise<SubTask> {
    return this.backendService.getRequest(this.url + "GetOne/" + id);
  }

  public async getAll(): Promise<Array<SubTask>> {
    return this.backendService.getRequest(this.url + "GetAll");
  }

  public async getByMainTask(id: string): Promise<Array<SubTask>> {
    return this.backendService.getRequest(this.url + "GetByMainTask/" + id);
  }

  public async upload(subTask: SubTask): Promise<any> {
    return this.backendService.postRequest(this.url + "Upload", subTask);
  }

  public async edit(id: string, subTask: SubTask): Promise<any> {
    return this.backendService.putRequest(this.url + "Edit/" + id, subTask);
  }

  public async delete(id: string): Promise<any> {
    return this.backendService.deleteRequest(this.url + "Delete/" + id);
  }
}
