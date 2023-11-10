import {Component, OnInit} from '@angular/core';
import {YourCityService} from "../services/yourcityservice/yourcity.service";
import {interval, startWith} from 'rxjs';
import {BackgroundFactory} from "../factories/factoryclassYourCity";
import {BlackOrWhite, PeriodOfDay} from "../enums/enumYourCity";
import {CityData} from "../interfaces/city-data";
import {CITY_STORAGE_KEY} from "../services/yourcityservice/yourcity.service";
import {LocalStorageService} from "../services/loacalstorageservice/localstorage.service";


@Component({
  selector: 'app-yourcity', templateUrl: './yourcity.component.html', styleUrls: ['./yourcity.component.scss']
})
export class YourCityComponent implements OnInit {

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

  constructor(private yourCityService: YourCityService,
              private storageService: LocalStorageService) {
  }

  ngOnInit() {
    setTimeout(() => this.runWatcher(), this.TIMER);
    this.yourCityService.getCoords();
  }

  runWatcher() {
    interval(this.INTERVAL_UPDATE)
      .pipe(startWith(this.ZERO))
      .subscribe(() => {
        this.setBackgroundBasedOnTime();
        this.getLocation();
      })
  }

  getLocation() {
    this.yourCityService.getData(this.storageService.getItem(CITY_STORAGE_KEY))
      .subscribe((data) => {
        this.cityData.name = data.name;
        this.cityData.weather = data.weather;
        this.cityData.weather[0].description = data.weather[0].description;
        this.cityData.main.humidity = data.main.humidity;
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
