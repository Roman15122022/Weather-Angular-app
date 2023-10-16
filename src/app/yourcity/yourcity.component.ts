import { Component, OnDestroy, OnInit } from '@angular/core';
import { YourCityService } from "../services/yourcity.service";
import {interval, startWith, Subscription} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BackgroundFactory } from "../factorys/factoryclassYourCity";
import { BlackOrWhite, PeriodOfDay } from "../enums/enumYourCity";


@Component({
  selector: 'app-yourcity',
  templateUrl: './yourcity.component.html',
  styleUrls: ['./yourcity.component.scss']
})
export class YourCityComponent implements OnInit, OnDestroy {

  nameCity: string = '';
  temp: number = 0;
  weather: any;
  periodOfDay: PeriodOfDay =  PeriodOfDay.DAY;
  blackOrWhite: BlackOrWhite = BlackOrWhite.WHITE;

  private geoSub: Subscription | null = null;

  constructor(private yourCityService: YourCityService) {
  }

  ngOnInit() {
    this.getLocation();
    this.setBackgroundBasedOnTime();
    interval(3000).subscribe(() => {
      this.setBackgroundBasedOnTime();
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        const {latitude, longitude} = coords;

        this.geoSub = interval(3000).
        pipe(
          startWith(0),
          switchMap(() => this.yourCityService.getNameByCoords(latitude, longitude))
        )
          .subscribe((data) => {
          this.nameCity = data.name;
          this.weather = data;
          this.temp = Math.round(data.main.temp);
          console.log(data);
        });
      }, (error) => {
        console.error('Error receiving geodata:', error);
      });
    } else {
      console.error('Your browser does not support geolocation.');
    }
  }

  setBackgroundBasedOnTime() {
    const now = new Date();
    const hours = now.getHours();
    const backgroundFactory = BackgroundFactory.createBackground(hours);
    this.periodOfDay = backgroundFactory.getPeriodOfDay();
    this.blackOrWhite = backgroundFactory.getBlackOrWhite();
  }
  ngOnDestroy() {
    if (this.geoSub) {
      this.geoSub.unsubscribe();
    }
  }

}
