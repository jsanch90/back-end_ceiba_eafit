import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../services/common-data-service/common-data.service';
import { Router } from '@angular/router';
import { PvDeviceServiceService } from '../../services/pv_device_service/pv-device-service.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  info: any = [];
  chart = [];
  chart2 = [];

  ngOnInit() {
    if (this.commonDataService.logged == true) {
      this.router.navigateByUrl('/user_dashboard');
      this.getSensorData("T");
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  constructor(private pvDeviceService: PvDeviceServiceService,
    public commonDataService: CommonDataService,
    private router: Router) { }


  getSensorData(sensorName) {
    this.pvDeviceService.getSensorByName(sensorName).subscribe((data: {}) => {
      this.info = data;
      let values = this.info['result'].map(res => res.value).reverse().map(x => x.toFixed(3));
      let dates = this.info['result'].map(res => res.date_time).reverse().map(x =>
        x.toString().substring(0,x.length-5)).map(x=>x.replace("T"," - "));

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              data: values,
              borderColor: "#abdc13",
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


      this.chart2 = new Chart('canvas', {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              data: values,
              borderColor: "#abdc13",
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

}
