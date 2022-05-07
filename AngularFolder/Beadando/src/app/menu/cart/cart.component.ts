import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/utils/connection.service';
import { LoginService } from 'src/app/utils/login.service';

@Component({
	selector: 'cart',
	templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {

	lista: Array<string> = [];
	constructor(private connection: ConnectionService,private loginService: LoginService, private router: Router) {
		
	}
	ngOnInit() {
		if (localStorage.getItem('user')) {
			this.loginService.getUser(localStorage.getItem('user')||"").subscribe(msg => {
				console.log( msg);
				for (const [key, value] of Object.entries(msg)) {
					console.log( key);
					if(key=="cart")
					this.lista=value
				}
		  	}, error => {
			console.log(error);
		  })
		}
	}
}