import { Component, OnInit} from '@angular/core';
import { CommonDataService } from '../../../../services/common-data-service/common-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navOpen = false;
  constructor(public commonDataService:CommonDataService, public router:Router) { }
  ngOnInit() {
  }

  public select = false;



  logout(){
    this.commonDataService.logged=false;
    this.commonDataService.sensors =false;
  }

  goToSensors() {
    this.commonDataService.sensors = true;
  }

  goToCeiba(){
    this.commonDataService.sensors = false;
  }

  pr(){
    console.log("prrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
  }
}
