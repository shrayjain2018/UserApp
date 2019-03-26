import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserReg } from '../model/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  //url of our JSON data
  baseUrl: string = "http://localhost:3000/users";
  baseUrlReg: string = "http://localhost:3000/login";

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  registerUser(userReg: UserReg) {
    return this.http.post(this.baseUrlReg, userReg);
  }

  getRegUser() {
    return this.http.get<UserReg[]>(this.baseUrlReg)
  }

}
