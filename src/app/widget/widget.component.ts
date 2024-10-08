import {Component, ElementRef, HostListener, OnInit, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import {WeatherWidget} from "../interfaces/weatherwidget";
import {WidgetUiMode} from "./WidgetUiMode";
import {LocalStorageService} from "../services/loacalstorage-service/localstorage.service";
import {WIDGET_STORAGE_KEY, WidgetService} from "../services/widget-service/widget.service";
import {EMPTY, from, interval, mergeMap, Observable, startWith, Subscription, switchMap} from "rxjs";
import {map} from "rxjs/operators";
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
export class WidgetComponent implements OnInit , AfterViewInit, OnDestroy {
  weatherWidgets: WeatherWidget[] = Array.from({length: 6}, () => new WidgetUiMode({} as WeatherWidget));
  @ViewChild('slickModal', {static: true}) slickModal!: SlickCarouselComponent;
  @ViewChild('removeLastBtn') removeLastBtn!: MatButton;
  @ViewChild('resetBtn') resetBtn!: MatButton;
  @ViewChild('btnLeft') btnLeft!: ElementRef;
  @ViewChild('btnRight') btnRight!: ElementRef;
  @ViewChild('cityInput') cityInput!: ElementRef;
  INTERVAL: number = 3000;
  slideConfig: SlideConfig = this.widgetService.getConfigBySize();
  cityArray: string[] = [];
  filterOptions!: Observable<string[]>;
  formsControl = new FormControl('');
  watcherSubscription!: Subscription;

  constructor(
    private storageService: LocalStorageService,
    private widgetService: WidgetService,
    private snackBar: MatSnackBar,
    private cityService: CityService,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
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

  fillingArray() {
    this.cityService.getCities().subscribe(
      (cities: string[]) => {
        this.cityArray = cities.sort();
      });
  }

  ngOnInit() {
    this.fillingArray();
    this.filterCity();
    this.localStorage();
    this.runWatcher();
    this.updateWeather();
  }

  ngAfterViewInit() {
    this.statusButtons();
  }
  ngOnDestroy() {
    this.unsubscribeWatcher();
  }

  updateWeather() {
    for (const widget of this.weatherWidgets) {
      this.getWeather(widget.id);
    }
  }

  showInput(id: number) {
    const widget = this.weatherWidgets.find(item => item.id === id) || {} as WidgetUiMode;
    widget.flag = false;
  }

  getWeather(id: number) {
    const currentWidget = this.weatherWidgets.find(item => item.id === id) || {} as WidgetUiMode;
    if (!currentWidget.name) return;

    this.widgetService.serviceData(currentWidget).subscribe({
      next: (data) => {
        this.widgetService.updateData(data, currentWidget);
        this.setLocalStorage();
        setTimeout(() => {
          this.resetBtn.color = 'accent';
          this.runWatcher();
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.openSnackBar();
        } else {
          console.error('An error occurred while receiving weather data:', error.statusText);
        }
      }
    });
  }

  openSnackBar() {
    this.snackBar.open('Incorrect city name. Please check the input', 'Done', {
      duration: 2000,
    });
  }

  runWatcher() {
    // Сначала отпишитесь от любой существующей подписки, чтобы избежать утечек памяти
    this.unsubscribeWatcher();

    // Создайте новую подписку
    this.watcherSubscription = from(this.weatherWidgets)
      .pipe(
        mergeMap(widget => {
          if (!widget.name) {
            return EMPTY;
          }

          return interval(this.INTERVAL).pipe(
            switchMap(() => this.widgetService.serviceData(widget)),
            map(data => new WidgetUiMode(data)),
            map(data => ({ data, widget }))
          );
        })
      )
      .subscribe(({ data, widget }) => {
        this.widgetService.updateData(data, widget);
        console.log(data);
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

  statusButtons() {
    this.widgetService.statusBtn(
      this.slideConfig.slidesToShow,
      this.weatherWidgets,
      this.removeLastBtn,
      this.btnLeft,
      this.btnRight,
    );
  }

  addWidget() {
    this.widgetService.activeButtons(
      this.slideConfig.slidesToShow,
      this.weatherWidgets,
      this.btnRight,
      this.btnLeft,
      this.removeLastBtn,
    );
    this.setLocalStorage();
  }

  removeLastWidget() {
    this.widgetService.removeLast(
      this.slideConfig.slidesToShow,
      this.weatherWidgets,
      this.btnRight,
      this.btnLeft,
      this.removeLastBtn,
      this.snackBar,
    );
    this.setLocalStorage();
  }

  resetThisWidget(id: number) {
    this.widgetService.resetThisWidget(this.weatherWidgets, id);
  }

  deleteThisWidget(id: number) {
    this.widgetService.deleteWidget(
      this.weatherWidgets,
      id,
      this.slideConfig.slidesToShow,
      this.btnRight,
      this.btnLeft,
      this.removeLastBtn,
      this.snackBar,
    );
    this.setLocalStorage();
  }

  nextSlide() {
    this.slickModal.slickNext();
  }

  prevSlide() {
    this.slickModal.slickPrev();
  }

  private _FILTER(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.cityArray.filter(option => option.toLowerCase().includes(searchValue));
  }

  private unsubscribeWatcher() {
    if (this.watcherSubscription) {
      this.watcherSubscription.unsubscribe();
    }
  }
}
