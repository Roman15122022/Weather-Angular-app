import { Component, OnInit } from '@angular/core';
import { YourcityService } from "../Service/yourcity.service";

@Component({
  selector: 'app-yourcity',
  templateUrl: './yourcity.component.html',
  styleUrls: ['./yourcity.component.css']
})
export class YourcityComponent {
  nameCity: any;
  temp: any;
  weather: any;
  timeOfDay: string = 'day';
  BlackOrWhite: string = 'afterWhite';
  constructor(private YourcityService: YourcityService) {
  }
  ngOnInit(){
    this.getLocation();
    this.SetBackgroundBasedOnTime();
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.YourcityService.getNameByCoords(latitude, longitude).subscribe((data) => {
          this.nameCity = data.name;
          this.weather = data;
          this.temp = Math.round(data.main.temp);
          console.log(data);
        }, (error) => {
          console.error('Error while retrieving data:', error);
        });
      }, (error) => {
        console.error('Error receiving geodata:', error);
      });
    } else {
      console.error('Your browser does not support geolocation.');
    }
  }
  SetBackgroundBasedOnTime (){
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12){
      this.timeOfDay= 'morning';
      this.BlackOrWhite = 'afterBlack';
    }else if (hours >= 12 && hours < 19){
      this.timeOfDay = 'day';
      this.BlackOrWhite = 'afterBlack';
    }else if (hours >=19 && hours < 22){
      this.timeOfDay = 'evening';
      this.BlackOrWhite = 'afterWhite';
    }else{
      this.timeOfDay = 'night';
      this.BlackOrWhite = 'afterWhite';
    }
  }
}
