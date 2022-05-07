import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/utils/login.service';

@Component({
	selector: 'createUser',
	templateUrl: 'createUser.component.html'
})

export class CreateUserComponent implements OnInit {
	username=""
	password=""
	constructor(private loginService: LoginService, private router: Router) {
		this.username = '';
		this.password = '';
	  }
	ngOnInit() {
		if (localStorage.getItem('user')) {
		  localStorage.removeItem('user');
		  this.loginService.logout().subscribe(msg => {
			console.log(msg);
		  }, error => {
			console.log(error);
		  })
		}
	}
	signup(){
		if (this.username != '' && this.password != '') {
			this.loginService.signup(this.username, this.password).subscribe(msg => {
			  console.log(msg);
			}, error => {
			  console.log(error);
			})
		}
	}
}