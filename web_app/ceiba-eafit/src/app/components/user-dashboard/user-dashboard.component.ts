import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../services/common-data-service/common-data.service';
import { Router } from '@angular/router';
import { CeibaVarsService } from '../../services/ceiba_vars_service/ceiba-vars.service';
import { Chart } from 'chart.js';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  vars = '';
  info: any = [];
  chart = [];
  show = true;
  downloadJsonHref = null;
  cCurrent = '';
  cBattery = '';
  cVoltage = '';
  cCurrentD = '';
  cBatteryD = '';
  cVoltageD = '';

  ngOnInit() {
    if (this.commonDataService.logged == true) {
      this.router.navigateByUrl('/user_dashboard');
      this.setCurrentVars();
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  constructor(private ceibaVarsService: CeibaVarsService,
    public commonDataService: CommonDataService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  generateDownloadJsonUri(data) {
    var theJSON = JSON.stringify(data);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }

  getRandomColor() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while (length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
  }



  getVarData(varName) {
    console.log(varName);
    
    this.ceibaVarsService.getVarByName(varName).subscribe((data: {}) => {
      this.info = data;
      this.generateDownloadJsonUri(this.info);
      let values = this.info['result'].map(res => res.value).reverse().map(x => x.toFixed(3));
      let dates = this.info['result'].map(res => res.date_time).reverse().map(x =>
        x.toString().substring(0, x.length - 5)).map(x => x.replace("T", " - "));

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              data: values,
              borderColor: this.getRandomColor(),
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }

  setCurrentVars() {
    this.ceibaVarsService.getVarByName("Current").subscribe((data: {}) => {
      this.info = data;
      this.cCurrent = this.info['result'].map(res => res.value)[0].toFixed(4);
      this.cCurrentD = this.info['result'].map(res => res.date_time)[0].
        toString().substring(0, this.info['result'].map(res => res.date_time)[0].length - 5).replace("T", " - ");
    });

    this.ceibaVarsService.getVarByName("Voltage").subscribe((data: {}) => {
      this.info = data;
      this.cVoltage = this.info['result'].map(res => res.value)[0].toFixed(4);
      this.cVoltageD =this.info['result'].map(res => res.date_time)[0].
      toString().substring(0, this.info['result'].map(res => res.date_time)[0].length - 5).replace("T", " - ");
    });

    this.ceibaVarsService.getVarByName("Battery").subscribe((data: {}) => {
      this.info = data;
      this.cBattery = this.info['result'].map(res => res.value)[0].toFixed(4);
      this.cBatteryD = this.info['result'].map(res => res.date_time)[0].
      toString().substring(0, this.info['result'].map(res => res.date_time)[0].length - 5).replace("T", " - ");
    });

  }

  showGraph() {
    this.setCurrentVars();
    this.show = true;
    this.chart=[];
    this.getVarData(this.vars);
  }

  clearGraph() {
    this.show = false;
  }

}
