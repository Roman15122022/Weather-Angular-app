import {Component, OnInit} from '@angular/core';
import {YourCityService} from "../services/yourcityservice/yourcity.service";
import {interval, startWith} from 'rxjs';
import {BackgroundFactory} from "../factories/factoryclassYourCity";
import {BlackOrWhite, PeriodOfDay} from "../enums/enumYourCity";


@Component({
  selector: 'app-yourcity',
  templateUrl: './yourcity.component.html',
  styleUrls: ['./yourcity.component.scss']
})
export class YourCityComponent implements OnInit {
  INTERVAL_UPDATE: number = 3000;
  nameCity: string = '';
  temp: number = 0;
  weather: any;
  periodOfDay: PeriodOfDay = PeriodOfDay.DAY;
  blackOrWhite: BlackOrWhite = BlackOrWhite.WHITE;

  constructor(private yourCityService: YourCityService) {
  }

  ngOnInit() {
    this.runWatcher();
  }

  runWatcher() {
    interval(this.INTERVAL_UPDATE).pipe(startWith(0)).subscribe(() => {
      this.getLocation();
      this.setBackgroundBasedOnTime();
    })
  }

  getLocation() {
    this.yourCityService.getData()
      .subscribe((data) => {
        this.nameCity = data.name;
        this.weather = data;
        this.temp = Math.round(data.main.temp);
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
