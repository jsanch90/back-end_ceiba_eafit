import { Component } from '@angular/core';
import { UserService } from '../user_service/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  constructor(private userService: UserService) { }

  

}
