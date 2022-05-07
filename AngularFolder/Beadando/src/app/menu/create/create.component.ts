import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/utils/connection.service';

@Component({
	selector: 'create',
	templateUrl: 'create.component.html'
})

export class CreateComponent implements OnInit {
	nev: string;
	ar: number;
	constructor(private connection: ConnectionService, private router: Router) {
		this.nev = '';
		this.ar = 1;
	  }
	ngOnInit() {
	}
	createItem(){
		if (this.nev != '' && this.ar != null) {
			this.connection.createData(this.nev, this.ar).subscribe(msg => {
			  console.log(msg);
			}, error => {
			  console.log(error);
			})
		}
	}
}