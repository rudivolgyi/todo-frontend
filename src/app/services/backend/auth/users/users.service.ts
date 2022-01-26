import { Injectable } from '@angular/core';
import { User } from 'src/app/models/auth/user.model';
import { BackendService } from '../../backend.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string = "Users/";

  constructor(private backendService: BackendService) { }

  public async getOne(id: string): Promise<User> {
    return this.backendService.getRequest(this.url + "GetOne/" + id);
  }

  public async getAll(): Promise<Array<User>> {
    return this.backendService.getRequest(this.url + "GetAll");
  }

  public async getByEmail(email: string): Promise<User> {
    return this.backendService.getRequest(this.url + "GetByEmail/" + email);
  }

  public async searchByName(name: string): Promise<Array<User>> {
    return this.backendService.getRequest(this.url + "SearchByName/" + name);
  }

  public async upload(user: User): Promise<any> {
    return this.backendService.postRequest(this.url + "Upload", user);
  }

  public async edit(id: string, user: User): Promise<any> {
    return this.backendService.putRequest(this.url + "Edit/" + id, user);
  }

  public async delete(id: string): Promise<any> {
    return this.backendService.deleteRequest(this.url + "Delete/" + id);
  }
}
