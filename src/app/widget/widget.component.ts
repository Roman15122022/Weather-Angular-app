import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {WeatherWidget} from "../interfaces/weatherwidget";
import {WidgetUiMode} from "./WidgetUiMode";
import {LocalStorageService} from "../services/loacalstorage-service/localstorage.service";
import {WIDGET_STORAGE_KEY, WidgetService} from "../services/widget-service/widget.service";
import {interval, Observable, startWith} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {MatButton} from "@angular/material/button";
import {SlideConfig} from "../interfaces/slide-config";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CityService} from "../services/city-srvice/city.service";
import {FormControl} from "@angular/forms";



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
  @ViewChild('slickModal', {static: true}) slickModal!: SlickCarouselComponent;
  @ViewChild('removeLastBtn') removeLastBtn!: MatButton;
  @ViewChild('resetBtn') resetBtn!: MatButton;
  @ViewChild('btnLeft') btnLeft!: ElementRef;
  @ViewChild('btnRight') btnRight!: ElementRef;
  @ViewChild('cityInput') cityInput!: ElementRef;
  intervalWatcher: number = 3000;
  slideConfig: SlideConfig = this.widgetService.getConfigBySize();

  cityArray: string[] = ['London', 'Kyiv', 'Dnipro', 'Kharkiv', 'Warsaw', 'Lodz', 'Odessa'];
  filterOptions!: Observable<string[]>;
  formsControl = new FormControl('');

  constructor(
    private storageService: LocalStorageService,
    private widgetService: WidgetService,
    private snackBar: MatSnackBar,
    private cityService: CityService,) {
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.slideConfig = this.widgetService.getConfigBySize();
    this.widgetService.reSizeWidget(
      this.slideConfig.slidesToShow,
      this.weatherWidgets,
      this.btnRight,
      this.btnLeft,
      this.removeLastBtn,
    );
  }

  filterCity() {
    this.filterOptions = this.formsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._FILTER(value || ''))
    );
  }

  ngOnInit() {
    this.filterCity();
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

    this.widgetService.serviceData(widget).subscribe(
      data => {
        this.widgetService.updateData(data, widget);
        this.setLocalStorage();
        setTimeout(() => {
          this.resetBtn.color = 'accent';
        });
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.openSnackBar();
        } else {
          console.error('An error occurred while receiving weather data:', error.statusText);
        }
      }
    );
  }

  openSnackBar() {
    this.snackBar.open('Incorrect city name. Please check the input', 'Done', {
      duration: 2000,
    });
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
  options = {
    types: ['address'],
    componentRestrictions: { country: 'your-country-code' } // Например, 'us'
  };
  private _FILTER(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.cityArray.filter(option => option.toLowerCase().includes(searchValue));
  }
}

