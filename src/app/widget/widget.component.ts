import { Component, OnInit } from '@angular/core';
import { WeatherService } from "../Service/weather.service";


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {
  city!: string;
  weatherData: any;
  constructor(private weatherService:WeatherService) {
  }
  getWeather(){
    this.weatherService.getWeather(this.city)
      .subscribe(data=>{
        this.weatherData=data;
        console.log(data);
      })
  }

}

