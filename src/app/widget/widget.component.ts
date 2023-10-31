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
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
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
  @ViewChild('slickModal', { static: true }) slickModal!: SlickCarouselComponent;
  @ViewChild('removeLast') removeLast!: MatButton;
  @ViewChild('btnLeft') btnLeft!: ElementRef;
  @ViewChild('btnRight') btnRight!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.slideConfig = this.widgetService.getConfigBySize();
    console.log(this.slideConfig)
  }
  intervalWatcher: number = 3000;
  slideConfig:SlideConfig = this.widgetService.getConfigBySize();

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
        console.log(this.slideConfig);
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

  addWidget(){
    const newWidget = new WidgetUiMode({} as WeatherWidget);
    this.weatherWidgets.push(newWidget);
    if (this.weatherWidgets.length > 3){
      this.removeLast.color = 'accent';
      this.btnLeft.nativeElement.classList.remove('display_none');
      this.btnRight.nativeElement.classList.remove('display_none');
    }
  }
  removeLastWidget() {
    if (this.weatherWidgets.length > 3) {
      this.weatherWidgets.length -= 1;
    }
    if (this.weatherWidgets.length === 3) {
      this.removeLast.color = undefined;
      this.btnLeft.nativeElement.classList.add('display_none');
      this.btnRight.nativeElement.classList.add('display_none');
    }
  }

  nextSlide(){
    this.slickModal.slickNext();
  }
  prevSlide(){
    this.slickModal.slickPrev();
  }

}

