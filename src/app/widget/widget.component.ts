import {Component, OnInit} from '@angular/core';
import {WeatherWidget} from "../interfaces/weatherwidget";
import {WidgetUiMode} from "./WidgetUiMode";
import {LocalStorageService} from "../services/loacalstorageservice/localstorage.service";
import {WIDGET_STORAGE_KEY, WidgetService} from "../services/widgetservice/widget.service";
import {interval} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnInit {
  weatherWidgets: WeatherWidget[] = [
    new WidgetUiMode({} as WeatherWidget),
    new WidgetUiMode({} as WeatherWidget),
    new WidgetUiMode({} as WeatherWidget),

  ];
  intervalWatcher: number = 3000;

  constructor(
    private storageService: LocalStorageService,
    private widgetService: WidgetService,
  ) {
  }

  ngOnInit() {
    this.localStorage();
    this.runWatcher()
    this.updateWeather();
  }

  updateWeather() {
    this.weatherWidgets.forEach((value) => {
      this.getWeather(value.id);
    })
  }

  showInput(id: number) {
    const widget = this.weatherWidgets.find((item) => {
      return item.id === id;
    }) || {} as WidgetUiMode;
    widget.flag = false;
  }

  getWeather(id: number) {
    const widget = this.weatherWidgets.find((item) => {
      return item.id === id;
    }) || {} as WidgetUiMode;
    this.widgetService.serviceData(widget).subscribe(data => {
      console.log(data);
      this.widgetService.updateData(data, widget);
    });
    this.setLocalStorage();
  }

  runWatcher() {
    this.weatherWidgets.forEach((widget: WeatherWidget) => {
      interval(this.intervalWatcher).pipe(
        switchMap(() => this.widgetService.serviceData(widget)),
        map((data) => new WidgetUiMode(data))
      ).subscribe(data => {
        this.widgetService.updateData(data, widget);
        console.log(data);
      });
    });
  }

  localStorage() {
    this.weatherWidgets = this.storageService.getItem(WIDGET_STORAGE_KEY);
  }

  setLocalStorage() {
    this.storageService.setItem(WIDGET_STORAGE_KEY, this.weatherWidgets);
  }

  resetLocalStorage() {
    this.storageService.resetItem(WIDGET_STORAGE_KEY);
    this.widgetService.resetWidget(this.weatherWidgets);
  }

  visibleWidget = this.weatherWidgets.slice();
  nextSlide() {
  }

  prevSlide() {

  }

}

