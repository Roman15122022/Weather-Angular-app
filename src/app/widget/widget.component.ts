import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../services/weather.service";
import { interval, startWith } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { WeatherWidget } from "../interfaces/weatherwidget";
import { Factorysrc, FactoryIcons } from "./factorysrc";
import { FactoryDaynight } from "./factory-daynight";
import { WidgetUiMode } from "./WidgetUiMode";


@Component({
  selector: "app-widget",
  templateUrl: "./widget.component.html",
  styleUrls: ["./widget.component.css"]
})
export class WidgetComponent implements OnInit {
  weatherWidgets: WeatherWidget[] = [
    new WidgetUiMode({} as WeatherWidget),
    new WidgetUiMode({} as WeatherWidget),
    new WidgetUiMode({} as WeatherWidget),
  ];
  formStates: { [key: string]: boolean } = {};

  constructor(private weatherService: WeatherService,
              private factorySrc: Factorysrc,
  ) {
  }

  ngOnInit() {
    interval(3000).subscribe(() => {
      this.putIcon();
    });
  }

  putIcon() {
    // @todo this.weatherWidgets = this.weatherWidgets.map();
    this.weatherWidgets.forEach((widget: WeatherWidget, index: number) => {
      if (widget.weatherData) {
        widget.IconSrc = this.factorySrc.settingIconBasedOnTimeAndWeather(widget.weatherData, this.getDayNigth(widget.TimeZone));
        widget.IconSrc = FactoryIcons.createIcon(widget.weatherData, this.getDayNight(widget.TimeZone));
      }
    });
  }

  getDayNight(timezone: number): boolean {
    const now = new Date();
    const currentHour = now.getUTCHours() + timezone / 3600;
    return currentHour >= 6 && currentHour < 18;
  }


  getWeather(index: number) {
    const widget = this.weatherWidgets[index];
    interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.weatherService.getWeather(widget.city)),
        map((data) => new WidgetUiMode(data))
      )
      .subscribe(data => {
        widget = data;
        // widget.weatherData = data;
        // widget.cityTemp = Math.round(data.main.temp);
        // widget.cityMinTemp = Math.round(data.main.temp_min);
        // widget.cityMaxTemp = Math.round(data.main.temp_max);
        // widget.TimeZone = data.timezone;


        console.log(data);
      });
    this.formStates[widget.city] = true;
  }

}

