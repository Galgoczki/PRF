import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Beadando';
  a = 2;
  b = 3;
  constructor(private router: Router){}

	goTologin(){
		this.router.navigate(["login"])
	}
	goTologout(){
		this.router.navigate(["logout"])
	}
	goTolist(){
		this.router.navigate(["list"])
	}
	goTocreate(){
		this.router.navigate(["create"])
	}
	goTodelete(){
		this.router.navigate(["delete"])
	}
	goTosignup(){
		this.router.navigate(["signup"])
	}
	goToCart(){
		this.router.navigate(["cart"])
	}
}
