import { Injectable } from '@angular/core';
import { Table } from 'src/app/models/content/tables/table.model';
import { BackendService } from '../../backend.service';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  private url: string = "Tables/";

  constructor(private backendService: BackendService) { }

  public async getOne(id: string): Promise<Table> {
    return this.backendService.getRequest(this.url + "GetOne/" + id);
  }

  public async getAll(): Promise<Array<Table>> {
    return this.backendService.getRequest(this.url + "GetAll");
  }

  public async getByWorkspace(id: string): Promise<Array<Table>> {
    return this.backendService.getRequest(this.url + "GetByWorkspace/" + id);
  }

  public async upload(table: Table): Promise<any> {
    return this.backendService.postRequest(this.url + "Upload", table);
  }

  public async edit(id: string, table: Table): Promise<any> {
    return this.backendService.putRequest(this.url + "Edit/" + id, table);
  }

  public async delete(id: string): Promise<any> {
    return this.backendService.deleteRequest(this.url + "Delete/" + id);
  }
}
