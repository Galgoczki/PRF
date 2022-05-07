import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/utils/connection.service';
import {KeyValue} from '@angular/common';

class Item{
	name:string = "";
	price:number = 0;
	constructor(name:string,price:number){
		this.name=name;
		this.price=price;
	}
}

@Component({
	selector: 'list',
	templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
	lista: Array<Item> = [];
	constructor(private connection: ConnectionService, private router: Router) {
		
	}
	ngOnInit() {
		this.connection.getdata().subscribe(msg => {
			console.log( msg);
			for (const [key, value] of Object.entries(msg)) {
				this.lista.push(new Item(value.nev,value.ar))
			}
		  }, error => {
			console.log(error);
		  }) }
	buy(item:string){
		if(localStorage.getItem('user')){
			this.connection.buy(item,localStorage.getItem('user')||"").subscribe(msg => {
				console.log( msg);
			  }, error => {
				console.log(error);
			  })
		}
	}
}