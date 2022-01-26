import { Injectable } from '@angular/core';
import { List } from 'src/app/models/content/lists/list.model';
import { BackendService } from '../../backend.service';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private url: string = "Lists/";

  constructor(private backendService: BackendService) { }

  public async getOne(id: string): Promise<List> {
    return this.backendService.getRequest(this.url + "GetOne/" + id);
  }

  public async getAll(): Promise<Array<List>> {
    return this.backendService.getRequest(this.url + "GetAll");
  }

  public async getByTable(id: string): Promise<Array<List>> {
    return this.backendService.getRequest(this.url + "GetByTable/" + id);
  }

  public async upload(list: List): Promise<any> {
    return this.backendService.postRequest(this.url + "Upload", list);
  }

  public async edit(id: string, list: List): Promise<any> {
    return this.backendService.putRequest(this.url + "Edit/" + id, list);
  }

  public async delete(id: string): Promise<any> {
    return this.backendService.deleteRequest(this.url + "Delete/" + id);
  }
}
