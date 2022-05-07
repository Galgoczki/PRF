import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/utils/connection.service';

class Item{
	name:string = "";
	price:number = 0;
	constructor(name:string,price:number){
		this.name=name;
		this.price=price;
	}
}

@Component({
	selector: 'delete',
	templateUrl: 'delete.component.html'
})

export class DeleteComponent implements OnInit {
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
	delete(itemname:string){
		if(localStorage.getItem('user')){
			this.connection.deleteData(itemname).subscribe(msg => {
				console.log( msg);
			  }, error => {
				console.log(error);
			  })
		}
	}
}