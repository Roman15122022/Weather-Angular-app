import {Component, OnDestroy, OnInit} from '@angular/core';
import {YourcityService} from "../services/yourcity.service";
import {interval, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {BackgroundFactory} from "./factoryclass";
import {BlackOrWhite, TimeOfDay} from "./enums";


@Component({
  selector: 'app-yourcity',
  templateUrl: './yourcity.component.html',
  styleUrls: ['./yourcity.component.css']
})
export class YourcityComponent implements OnInit, OnDestroy {

  nameCity: string = '';
  temp: number = 0;
  weather: any;
  timeOfDay: TimeOfDay =  TimeOfDay.Day;
  BlackOrWhite: BlackOrWhite = BlackOrWhite.AfterWhite;
  private geoSub: Subscription | null = null;

  constructor(private YourcityService: YourcityService) {
  }

  ngOnInit() {
    this.getLocation();
    interval(3000).subscribe(() => {
      this.SetBackgroundBasedOnTime();
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        const {latitude, longitude} = coords;

        this.geoSub = interval(3000).pipe(
          switchMap(() => this.YourcityService.getNameByCoords(latitude, longitude))
        ).subscribe((data) => {
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

  SetBackgroundBasedOnTime() {
    const now = new Date();
    const hours = now.getHours();
    const { timeOfDay, BlackOrWhite } = BackgroundFactory.createBackground(hours);
    this.timeOfDay = timeOfDay as TimeOfDay;
    this.BlackOrWhite = BlackOrWhite as BlackOrWhite;
  }
  ngOnDestroy() {
    if (this.geoSub) {
      this.geoSub.unsubscribe();
    }
  }

}
