import {Daynight} from "../interfaces/daynight";
import {Injectable} from "@angular/core";

@Injectable()
export class FactoryDaynight{
  daynight : Daynight;
  constructor() {
    this.daynight = {
      hours: 0,
      now : new Date(),
      dayTime : 6,
      nightTime : 18,
    }
    this.daynight.hours = this.daynight.now.getHours();

  }
  isDayTime() {
    return (
      this.daynight.hours >= this.daynight.dayTime &&
      this.daynight.hours < this.daynight.nightTime
    );
  }
}
