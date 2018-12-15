import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user_service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  f_name = '';
  l_name = '';
  email = '';
  password = '';
  password2 = '';

  info: any = [];

  constructor(public userService: UserService,
    private router: Router) { }

  ngOnInit() {

  }

  public register() {
    console.log(this.f_name, this.l_name, this.email, this.password, this.password2);
    if (this.f_name == '' || this.l_name == '' || this.email == '' || this.password == '' || this.password2 == '') {
      alert('All fields must be filled');
    }
    if (this.password != this.password2) {
      alert("Password doesn't match");
      this.password = '';
      this.password2 = '';
    } else {
      this.userService.userRegistration(this.f_name, this.l_name, this.email, 'common', this.password).subscribe((data: {}) => {
        this.info = data;
        if (this.info.success == true) {
          alert('User Created');
          this.router.navigateByUrl('/login');
        } else if (this.info.success == false) {
          alert("Error:\n" + this.info.msg);
        }
      });
    }
  }

}
