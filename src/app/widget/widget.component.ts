import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../services/weather.service";
import {interval, startWith} from 'rxjs';
import {map,switchMap} from 'rxjs/operators';
import {WeatherWidget} from "../interfaces/weatherwidget";
import {WidgetUiMode} from "./WidgetUiMode";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  weatherWidgets: WeatherWidget[] = [
    new WidgetUiMode({} as WeatherWidget),
    new WidgetUiMode({} as WeatherWidget),
    new WidgetUiMode({} as WeatherWidget),
  ];
  btnClass: string[] = [];
  constructor(private weatherService: WeatherService,) {}
  ngOnInit() {
  }
  showInput(index: number) {
    const widget = this.weatherWidgets[index];
    widget.flag = false;
    this.btnClass[index] = 'display_none';
  }

  getWeather(index: number) {
    const widget = this.weatherWidgets[index];
    interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.weatherService.getWeather(widget.name)),
        map((data) => new WidgetUiMode(data))
      )
      .subscribe(data => {
        widget.weatherData = data;
        widget.name = data.name;
        widget.main.temp = data.main.temp;
        widget.main.temp_min = data.main.temp_min;
        widget.main.temp_max = data.main.temp_max;
        widget.flag = true;

        console.log(data);
      });
  }

}

