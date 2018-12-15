import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user_service/user.service';
import { CommonDataService } from '../../services/common-data-service/common-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  email = '';
  password = '';

  info: any = [];

  ngOnInit() {
  }

  constructor(public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public commonDataService: CommonDataService) { }
  login() {
    console.log("-------------------------------", this.email);
    console.log("-------------------------------", this.password);
    this.info = [];
    this.userService.userLogin(this.email, this.password).subscribe((data: {}) => {
      this.info = data;
      if (this.info.success == true) {
        console.log("logged");
        this.commonDataService.logged = true;
        if (this.commonDataService.logged == true) {
          this.router.navigateByUrl('/user_dashboard');
          console.log(this.commonDataService.logged);
        }else{
          this.router.navigateByUrl('/login');
        }
      } else if (this.info.success == false) {
        alert("Error:\n" + this.info.msg);
        this.password='';
      }
    });
  }

}
