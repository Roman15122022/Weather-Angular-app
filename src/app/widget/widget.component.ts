import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../services/weather.service";
import {interval} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {WeatherWidget} from "./weatherwidget";


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  srcRain: string = '../../assets/icon_weather/rain.png'
  srcClouds: string = '../../assets/icon_weather/clouds.png'
  srcSnow: string = '../../assets/icon_weather/snow.png'
  srcSun: string = '../../assets/icon_weather/sun.png'
  srcSunClouds: string = '../../assets/icon_weather/sunwclouds.png'
  srcThunderstorm: string = '../../assets/icon_weather/thunderstorm.png'
  weatherWidgets: WeatherWidget[] = [
    {city: '', weatherData: null},
    {city: '', weatherData: null},
  ];
  kyiv: string = 'Kyiv';
  kyivData: any;
  kyivTemp: number = 0;
  kyivMaxTemp: number = 0;
  kyivMinTemp: number = 0;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.getKyiv()
  }

  getKyiv() {
    interval(3000)
      .pipe(
        switchMap(() => this.weatherService.getWeather(this.kyiv))
      ).subscribe(data => {
      this.kyivData = data;
      this.kyivTemp = Math.round(data.main.temp);
      this.kyivMaxTemp = Math.round(data.main.temp_min);
      this.kyivMinTemp = Math.round(data.main.temp_min);


      console.log(data)
    })
  }

  getWeather(index: number) {
    const widget = this.weatherWidgets[index];
    interval(3000)
      .pipe(
        switchMap(() => this.weatherService.getWeather(widget.city))
      )
      .subscribe(data => {
        widget.weatherData = data;
        console.log(data);
      });
  }


}

