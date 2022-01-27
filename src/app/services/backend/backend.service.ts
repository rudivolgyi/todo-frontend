import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  //public static url: string = "http://localhost:37608/api/";
  public static url: string = "https://api.rudivolgyi.com/api/";

  constructor(private http: HttpClient) { }

  public async getRequest(path: string): Promise<any> {
    return this.http.get<any>(BackendService.url + path).toPromise();
  }

  public async postRequest(path: string, object: object): Promise<any> {
    return this.http.post<any>(BackendService.url + path, object).toPromise();
  }

  public async putRequest(path: string, object: object): Promise<any> {
    return this.http.put<any>(BackendService.url + path, object).toPromise();
  }

  public async deleteRequest(path: string): Promise<any> {
    return this.http.delete<any>(BackendService.url + path).toPromise();
  }

}
