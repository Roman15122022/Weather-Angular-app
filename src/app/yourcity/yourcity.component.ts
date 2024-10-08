import {Component, OnDestroy, OnInit} from '@angular/core';
import {YourCityService} from "../services/yourcity-service/yourcity.service";
import {interval, startWith, Subscription} from 'rxjs';
import {BackgroundFactory} from "../factories/factoryclassYourCity";
import {BlackOrWhite, PeriodOfDay} from "../enums/enumYourCity";
import {CityData} from "../interfaces/city-data";
import {CITY_STORAGE_KEY} from "../services/yourcity-service/yourcity.service";
import {LocalStorageService} from "../services/loacalstorage-service/localstorage.service";



@Component({
  selector: 'app-yourcity',
  templateUrl: './yourcity.component.html',
  styleUrls: ['./yourcity.component.scss']
})
export class YourCityComponent implements OnInit, OnDestroy {

  cityData: CityData = {
    name: "",
    temp: 0,
    wind: {
      speed: 0
    },
    main: {
      humidity: 0
    },
    weather: [{
      description: ''
    }]
  };
  INTERVAL_UPDATE: number = 3000;
  ZERO: number = 0;
  TIMER: number = 5;
  periodOfDay: PeriodOfDay = PeriodOfDay.DAY;
  blackOrWhite: BlackOrWhite = BlackOrWhite.WHITE;
  private subscriptions: Subscription[] = [];

  constructor(private yourCityService: YourCityService,
              private storageService: LocalStorageService,) {
  }

  ngOnInit() {
    setTimeout(() => this.runWatcher(), this.TIMER);
    this.yourCityService.getCoords();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  runWatcher() {
    const watcher$ = interval(this.INTERVAL_UPDATE)
      .pipe(startWith(this.ZERO))
      .subscribe(() => {
        this.setBackgroundBasedOnTime();
        this.getLocation();
      })
    this.subscriptions.push(watcher$);
  }

  getLocation() {
    this.yourCityService.getData(this.storageService.getItem(CITY_STORAGE_KEY))
      .subscribe((data) => {
        console.log(data)
        this.cityData.name = data.name;
        this.cityData.weather = data.weather;
        this.cityData.weather[0].description = data.weather[0].description;
        this.cityData.main.humidity = data.main.humidity;
        this.cityData.wind.speed = data.wind.speed
        this.cityData.temp = Math.round(data.main.temp);
      });

  }

  setBackgroundBasedOnTime() {
    const now = new Date();
    const hours = now.getHours();
    const backgroundFactory = BackgroundFactory.createBackground(hours);
    this.periodOfDay = backgroundFactory.getPeriodOfDay();
    this.blackOrWhite = backgroundFactory.getBlackOrWhite();
  }
}
