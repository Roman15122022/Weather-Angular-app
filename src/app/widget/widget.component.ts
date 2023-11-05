import {Component, OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import {WeatherWidget} from "../interfaces/weatherwidget";
import {WidgetUiMode} from "./WidgetUiMode";
import {LocalStorageService} from "../services/loacalstorageservice/localstorage.service";
import {WIDGET_STORAGE_KEY, WidgetService} from "../services/widgetservice/widget.service";
import {interval} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {MatButton} from "@angular/material/button";
import {SlideConfig} from "../interfaces/slide-config";

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
  @ViewChild('slickModal', {static: true}) slickModal!: SlickCarouselComponent;
  @ViewChild('removeLastBtn') removeLastBtn!: MatButton;
  @ViewChild('resetBtn') resetBtn!: MatButton;
  @ViewChild('btnLeft') btnLeft!: ElementRef;
  @ViewChild('btnRight') btnRight!: ElementRef;
  intervalWatcher: number = 3000;
  slideConfig: SlideConfig = this.widgetService.getConfigBySize();

  constructor(
    private storageService: LocalStorageService,
    private widgetService: WidgetService,) {
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.slideConfig = this.widgetService.getConfigBySize();
    this.widgetService.reSizeWidget(
      this.slideConfig.slidesToShow,
      this.weatherWidgets,
      this.btnRight,
      this.btnLeft,
      this.removeLastBtn,
      this.slickModal,
      );
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
      this.widgetService.updateData(data, widget);
    });
    this.setLocalStorage();
    this.resetBtn.color = 'warn';
  }

  runWatcher() {
    this.weatherWidgets.forEach((widget: WeatherWidget) => {
      interval(this.intervalWatcher)
        .pipe(
          switchMap(() => this.widgetService.serviceData(widget)),
          map((data) => new WidgetUiMode(data))
        ).subscribe(data => {
        this.widgetService.updateData(data, widget);
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
    this.resetBtn.color = undefined;
  }

  addWidget() {
    this.widgetService.activeButtons(this.slideConfig.slidesToShow,
      this.weatherWidgets,
      this.btnRight,
      this.btnLeft,
      this.removeLastBtn,);
  }

  removeLastWidget() {
    this.widgetService.disabledButtons(
      this.slideConfig.slidesToShow,
      this.weatherWidgets,
      this.btnRight,
      this.btnLeft,
      this.removeLastBtn,
      );
  }

  nextSlide() {
    this.slickModal.slickNext();
  }

  prevSlide() {
    this.slickModal.slickPrev();
  }

}

