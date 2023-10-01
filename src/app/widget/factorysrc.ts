import {Icon} from "./enum.icon";
import {WeatherService} from "../services/weather.service";
import {FactoryDaynight} from "./factory-daynight";
import {Injectable} from "@angular/core";

@Injectable()
export class Factorysrc {
  kyivDataMain: any;
  kyivDataDescription: any;
  dayNight: boolean = true;


  constructor(
    private weatherService: WeatherService,
    private factoryDaynight: FactoryDaynight
  ) {}

  settingIconBasedOnTimeAndWeather(kyivData: any):Icon {
    this.kyivDataDescription = kyivData.weather[0].description;
    this.kyivDataMain = kyivData.weather[0].main;
    this.dayNight = this.factoryDaynight.isDayTime();
    switch (true) {
      case this.kyivDataDescription === 'scattered clouds':
        return Icon.SCATTERRED;
        break;
      case this.kyivDataDescription === 'broken clouds'
      || this.kyivDataDescription === 'overcast clouds':
        return Icon.BROKEN;
        break;
      case this.kyivDataMain === 'Clear' && this.dayNight:
        return Icon.CLEARSKYDAY;
        break;
      case this.kyivDataMain === 'Clear' && !this.dayNight:
        return Icon.CLEARSKYNIGHT;
        break;
      case this.kyivDataMain === 'Thunderstorm':
        return Icon.THUNDERSTORM;
        break;
      case this.kyivDataMain === 'Drizzle':
        return Icon.SHOWER;
        break;
      case this.kyivDataDescription === 'light intensity shower rain'
      || this.kyivDataDescription === 'shower rain'
      || this.kyivDataDescription === 'heavy intensity shower rain'
      ||this.kyivDataDescription === 'ragged shower rain':
        return Icon.SHOWER;
        break;
      case this.kyivDataMain === 'Rain' && this.dayNight:
        return Icon.RAINDAY;
        break;
      case this.kyivDataMain === 'Rain' && !this.dayNight:
        return Icon.RAINNIGHT;
        break;
      case this.kyivDataMain === 'Snow' || this.kyivDataDescription === 'freezing rain':
        return Icon.SNOW;
        break;
      case this.kyivDataDescription === 'few clouds' && this.dayNight:
        return Icon.FEWCLOUDSDAY;
        break;
      case this.kyivDataDescription === 'few clouds' && !this.dayNight:
        return Icon.FEWCLOUDSNIGHT;
        break;
      default:
        return Icon.DEFAULT;
        break;
    }
  }
}
