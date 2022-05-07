import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  getdata(){
    return this.http.get("https://ltps80-prf2021.herokuapp.com/" + 'arukereso/',{responseType: 'json', withCredentials: true});
  }
  createData(name: string, price: number){
    return this.http.post("https://ltps80-prf2021.herokuapp.com/" + 'arukereso/'+name, {id: name, ar: price}, 
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }
  deleteData(itemname: string){
    return this.http.delete("https://ltps80-prf2021.herokuapp.com/" + 'arukereso/'+itemname);
  }
  buy(itemname: string,username:string){
    return this.http.post("https://ltps80-prf2021.herokuapp.com/" + 'userscart/'+username,{id: username, item: itemname}, 
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});;
  }
}
