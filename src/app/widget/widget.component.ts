import { Component, OnInit } from '@angular/core';
import { WeatherService } from "../services/weather.service";
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WeatherWidget } from "./weatherwidget";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit{
  weatherWidgets: WeatherWidget[] = [
    { city: '', weatherData: null },
    { city: '', weatherData: null },
    { city: '', weatherData: null },
  ];
  kyiv: string = 'Kyiv';
  kyivData: any;
  kyivTemp: number = 0;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getKyiv()
  }
  getKyiv() {
    interval(5000)
      .pipe(
        switchMap(() => this.weatherService.getWeather(this.kyiv))
      ).subscribe( data => {
        this.kyivData = data;
        this.kyivTemp = Math.round(data.main.temp);

        console.log(data)
    })
  }
  getWeather(index: number) {
    const widget = this.weatherWidgets[index];
    interval(5000)
      .pipe(
        switchMap(() => this.weatherService.getWeather(widget.city))
      )
      .subscribe(data => {
        widget.weatherData = data;
        console.log(data);
      });
  }


}

