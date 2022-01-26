import { Injectable } from '@angular/core';
import { MainTask } from 'src/app/models/content/tasks/mainTasks/mainTask.model';
import { BackendService } from '../../backend.service';

@Injectable({
  providedIn: 'root'
})
export class MainTasksService {

  private url: string = "MainTasks/";

  constructor(private backendService: BackendService) { }

  public async getOne(id: string): Promise<MainTask> {
    return this.backendService.getRequest(this.url + "GetOne/" + id);
  }

  public async getAll(): Promise<Array<MainTask>> {
    return this.backendService.getRequest(this.url + "GetAll");
  }

  public async getByTaskList(id: string): Promise<Array<MainTask>> {
    return this.backendService.getRequest(this.url + "GetByTaskList/" + id);
  }

  public async upload(mainTask: MainTask): Promise<any> {
    return this.backendService.postRequest(this.url + "Upload", mainTask);
  }

  public async edit(id: string, mainTask: MainTask): Promise<any> {
    return this.backendService.putRequest(this.url + "Edit/" + id, mainTask);
  }

  public async delete(id: string): Promise<any> {
    return this.backendService.deleteRequest(this.url + "Delete/" + id);
  }
}
