import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';

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
