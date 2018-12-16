import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../services/common-data-service/common-data.service';
import { Router } from '@angular/router';
import { CeibaVarsService } from '../../services/ceiba_vars_service/ceiba-vars.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  vars ='';

  info: any = [];
  chart = [];
  chart2 = [];
  show = true;

  ngOnInit() {
    if (this.commonDataService.logged == true) {
      this.router.navigateByUrl('/user_dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  constructor(private ceibaVarsService: CeibaVarsService,
    public commonDataService: CommonDataService,
    private router: Router) { }

    getRandomColor() {
      var length = 6;
      var chars = '0123456789ABCDEF';
      var hex = '#';
      while(length--) hex += chars[(Math.random() * 16) | 0];
      return hex;
    }
    


  getVarData(varName) {
    this.ceibaVarsService.getVarByName(varName).subscribe((data: {}) => {
      this.info = data;
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

  showGraph() {
    this.show=true;
    console.log(this.vars);
    console.log("prrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    console.log(this.vars);
    this.getVarData(this.vars);
  }

  clearGraph(){
    this.getVarData("x");
    this.show=false;
  }

}
