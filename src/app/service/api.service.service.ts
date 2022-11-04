import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  basepath = 'https://localhost:7026/api/v1/';
  constructor(private http: HttpClient) {}

  //Register
  postUser(data: any) {
    return this.http.post<any>(this.basepath + 'user', data);
  }

  postUserProfile(data: any) {
    return this.http.post<any>(this.basepath + 'userprofile', data);
  }

  //Login
  getUser() {
    return this.http.get<any>(this.basepath + 'user');
  }

  //Leasing
}
