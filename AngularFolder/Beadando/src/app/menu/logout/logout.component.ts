import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/utils/login.service';

@Component({
	selector: 'logout',
	templateUrl: 'logout.component.html'
})

export class LogoutComponent implements OnInit {
	constructor(private loginService: LoginService, private router: Router) {}

	ngOnInit() { }

	logout(){
		if(localStorage.getItem('user')) {
			localStorage.removeItem('user');
			this.loginService.logout()
		}
	}
}