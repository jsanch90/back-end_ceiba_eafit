import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../services/common-data-service/common-data.service';
import { PvDeviceServiceService } from '../../services/pv_device_service/pv-device-service.service';
import { Chart } from 'chart.js';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.css']
})
export class SensorsDataComponent implements OnInit {

  sensor = '';
  info: any = [];
  chart = [];
  show = true;
  downloadJsonHref = null;


  ngOnInit() {
  }


  constructor(private pvDeviceServiceService: PvDeviceServiceService,
    public commonDataService: CommonDataService,
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

  getSensorData(sensorName) {
    this.pvDeviceServiceService.getSensorByName(sensorName).subscribe((data: {}) => {
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

  showGraph() {
    this.show = true;
    this.getSensorData(this.sensor);
  }

  clearGraph() {
    this.show = false;
  }

}
