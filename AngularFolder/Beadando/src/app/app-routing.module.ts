import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './menu/create/create.component';
import { CreateUserComponent } from './menu/createUser/createUser.component';
import { DeleteComponent } from './menu/delete/delete.component';
import { ListComponent } from './menu/list/list.component';
import { LoginComponent } from './menu/login/login.component';
import { LogoutComponent } from './menu/logout/logout.component';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './menu/cart/cart.component';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:'full'},
  {path:"login",component:LoginComponent},
  {path:"logout",component:LogoutComponent},
  {path:"list",component:ListComponent, canActivate: [AuthGuard]},
  {path:"cart",component:CartComponent, canActivate: [AuthGuard]},
  {path:"create",component:CreateComponent, canActivate: [AuthGuard]},
  {path:"delete",component:DeleteComponent, canActivate: [AuthGuard]},
  {path:"signup",component:CreateUserComponent},
  {path:"**",redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
