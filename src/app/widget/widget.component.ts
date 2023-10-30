import {Component, OnInit} from '@angular/core';
import {WeatherWidget} from "../interfaces/weatherwidget";
import {WidgetUiMode} from "./WidgetUiMode";
import {LocalStorageService} from "../services/loacalstorageservice/localstorage.service";
import {WIDGET_STORAGE_KEY, WidgetService} from "../services/widgetservice/widget.service";
import {interval} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-widget', templateUrl: './widget.component.html', styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnInit {
  weatherWidgets: WeatherWidget[] = [
    new WidgetUiMode({} as WeatherWidget),
    new WidgetUiMode({} as WeatherWidget),
    new WidgetUiMode({} as WeatherWidget),
    new WidgetUiMode({} as WeatherWidget),
    new WidgetUiMode({} as WeatherWidget),
    new WidgetUiMode({} as WeatherWidget),
  ];
  intervalWatcher: number = 3000;
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: '<div class="custom-arrow"><button style="width: 50px; height: 50px; padding-top: 3px; background-color: transparent; border: none; border-radius: 50%; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor=\'rgba(128, 128, 128, 0.5)\';" onmouseout="this.style.backgroundColor=\'transparent\';"><i class="material-icons">keyboard_arrow_left</i></button></div>',
    nextArrow: '<div class="custom-arrow"><button style="width: 50px; height: 50px; padding-top: 3px; background-color: transparent; border: none; border-radius: 50%; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor=\'rgba(128, 128, 128, 0.5)\';" onmouseout="this.style.backgroundColor=\'transparent\';" ><i class="material-icons">keyboard_arrow_right</i></button></div>',
  }

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
      interval(this.intervalWatcher).pipe(switchMap(() => this.widgetService.serviceData(widget)), map((data) => new WidgetUiMode(data))).subscribe(data => {
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

  nextSlide() {

  }

  prevSlide() {
  }

}

