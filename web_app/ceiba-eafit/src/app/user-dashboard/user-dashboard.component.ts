import { Component, OnInit } from '@angular/core';
import { UserService } from '../user_service/user.service';
import { CommonDataService } from '../common-data-service/common-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  ngOnInit() {
    if (this.commonDataService.logged == true) {
      this.router.navigateByUrl('/user_dashboard');
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  constructor(private userService: UserService,
    public commonDataService: CommonDataService,
    private router: Router) { }



}
