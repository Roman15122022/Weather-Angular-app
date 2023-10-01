import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../services/weather.service";
import {interval, startWith} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {WeatherWidget} from "../interfaces/weatherwidget";
import {Factorysrc} from "./factorysrc";
import {Icon} from "./enum.icon";


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  weatherWidgets: WeatherWidget[] = [
    {city: '', weatherData: null},
    {city: '', weatherData: null},
  ];
  kyivData: any;
  kyivTemp: number = 0;
  kyivMaxTemp: number = 0;
  kyivMinTemp: number = 0;
  srcKyiv: Icon = Icon.DEFAULT;

  constructor(private weatherService: WeatherService, private factorySrc: Factorysrc) {
  }

  ngOnInit() {
    this.getCityWeather('Kyiv');
    interval(3000).subscribe(() => {
      this.getIcon();
    });
  }

  getCityWeather(city: string) {
    interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.weatherService.getWeather(city))
      ).subscribe(data => {
      this.kyivData = data;
      this.kyivTemp = Math.round(data.main.temp);
      this.kyivMaxTemp = Math.round(data.main.temp_max);
      this.kyivMinTemp = Math.round(data.main.temp_min);


      console.log(data)
    })
    return this.kyivData;
  }

  getIcon() {
   this.srcKyiv = this.factorySrc.settingIconBasedOnTimeAndWeather(this.kyivData);
  }

  getWeather(index: number) {
    const widget = this.weatherWidgets[index];
    interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.weatherService.getWeather(widget.city))
      )
      .subscribe(data => {
        widget.weatherData = data;
        console.log(data);
      });
  }


}

