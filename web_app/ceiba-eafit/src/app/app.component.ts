import { Component, OnInit } from '@angular/core';
import { UserService } from './user_service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  email = '';
  password = '';

  info: any = [];

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router) { }

  getUser(userName) {
    this.info = [];
    this.userService.getUserById(userName).subscribe((data: {}) => {
      this.info = data;
    });
    console.log(this.info);
  }

  login() {
    console.log("-------------------------------", this.email);
    console.log("-------------------------------", this.password);
    this.info = [];
    this.userService.userLogin(this.email, this.password).subscribe((data: {}) => {
      this.info = data;
      if(this.info.success == true){
          console.log("logged");
      }
    });
  }
}
