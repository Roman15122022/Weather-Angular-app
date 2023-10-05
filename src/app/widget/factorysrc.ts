import {Icon} from "./enum.icon";
import {WeatherService} from "../services/weather.service";
import {FactoryDaynight} from "./factory-daynight";
import {Injectable} from "@angular/core";
import {WeatherWidget} from "../interfaces/weatherwidget"

@Injectable({ providedIn: 'root'})
export class Factorysrc {
  cityDataMain: string = '';
  cityDataDescription: string = '';
  dayNight: boolean = true;

  constructor(
    private weatherService: WeatherService,
    private factoryDaynight: FactoryDaynight
  ) {}
  settingIconBasedOnTimeAndWeather(cityData: WeatherWidget, timezone:number ):Icon {
    this.cityDataDescription = cityData.weather[0].description;
    this.cityDataMain = cityData.weather[0].main;
    this.dayNight = this.factoryDaynight.setTimeZone(timezone);
   /* console.log(timezone);
    console.log(this.dayNight);*/
    switch (true) {
      case this.cityDataDescription === 'scattered clouds':
        return Icon.SCATTERRED;
        break;
      case this.cityDataDescription === 'broken clouds'
      || this.cityDataDescription === 'overcast clouds':
        return Icon.BROKEN;
        break;
      case this.cityDataMain === 'Clear' && this.dayNight:
        return Icon.CLEARSKYDAY;
        break;
      case this.cityDataMain === 'Clear' && !this.dayNight:
        return Icon.CLEARSKYNIGHT;
        break;
      case this.cityDataMain === 'Thunderstorm':
        return Icon.THUNDERSTORM;
        break;
      case this.cityDataMain === 'Drizzle':
        return Icon.SHOWER;
        break;
      case this.cityDataDescription === 'light intensity shower rain'
      || this.cityDataDescription === 'shower rain'
      || this.cityDataDescription === 'heavy intensity shower rain'
      ||this.cityDataDescription === 'ragged shower rain':
        return Icon.SHOWER;
        break;
      case this.cityDataMain === 'Rain' && this.dayNight:
        return Icon.RAINDAY;
        break;
      case this.cityDataMain === 'Rain' && !this.dayNight:
        return Icon.RAINNIGHT;
        break;
      case this.cityDataMain === 'Snow' || this.cityDataDescription === 'freezing rain':
        return Icon.SNOW;
        break;
      case this.cityDataDescription === 'few clouds' && this.dayNight:
        return Icon.FEWCLOUDSDAY;
        break;
      case this.cityDataDescription === 'few clouds' && !this.dayNight:
        return Icon.FEWCLOUDSNIGHT;
        break;
      default:
        return Icon.DEFAULT;
        break;
    }
  }
}
