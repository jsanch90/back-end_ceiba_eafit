import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  { path: 'user_dashboard', component: UserDashboardComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: UserRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UserDashboardComponent, LoginComponentComponent,UserRegistrationComponent];
