import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  basepath = 'https://localhost:7026/api/v1/';
  constructor(private http: HttpClient) {}

  //Register
  postUser(data: any) {
    return this.http.post<any>(this.basepath + 'userprofile', data);
  }

  //Login
  getUserByEmailAndPassword(email: string, password: string) {
    return this.http.get<any>(
      this.basepath + `userprofile?email=${email}&password=${password}`
    );
  }

  //Leasing
}
