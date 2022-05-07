import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post("https://ltps80-prf2021.herokuapp.com/" + 'login', {username: username, password: password}, 
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }

  logout() {
    return this.http.post("https://ltps80-prf2021.herokuapp.com/" + 'logout', 
    {withCredentials: true, responseType: 'text'});
  }
  signup(username: string, password: string){
    return this.http.post("https://ltps80-prf2021.herokuapp.com/" + 'users/'+username, {username: username, password: password}, 
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }
  getUser(username: string){
    return this.http.get("https://ltps80-prf2021.herokuapp.com/" + 'users/'+username,{responseType: 'json', withCredentials: true});
  }
}
