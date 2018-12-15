import { Component, OnInit, HostListener } from '@angular/core';
import { CommonDataService } from '../../../../services/common-data-service/common-data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navOpen = false;
  constructor(public commonDataService:CommonDataService) { }
  ngOnInit() {
  }
}
