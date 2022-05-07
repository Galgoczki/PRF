import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './menu/login/login.component';
import { LogoutComponent } from './menu/logout/logout.component';
import { ListComponent } from './menu/list/list.component';
import { CreateComponent } from './menu/create/create.component';
import { DeleteComponent } from './menu/delete/delete.component';
import { CreateUserComponent } from './menu/createUser/createUser.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './menu/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ListComponent,
    CreateComponent,
    DeleteComponent,
    CartComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
