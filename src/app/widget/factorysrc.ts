import { Icon } from "./enum.icon";

import { WeatherWidget } from "../interfaces/weatherwidget";


export class FactoryIcons {
  icon = "";

  constructor(icon: string) {
    this.icon = icon;
  }

  static createIcon({ weather }: WeatherWidget, dayNight: boolean): FactoryIcons {
    const cityDataDescription = weather[0].description;
    const cityDataMain = weather[0].main;
    switch (true) {
      case cityDataDescription === "scattered clouds":
        return new FactoryIcons(Icon.SCATTERRED);

      default:
        return new FactoryIcons(Icon.DEFAULT);
    }
  }


  settingIconBasedOnTimeAndWeather({ weather }: WeatherWidget, dayNight: boolean): Icon {
    const cityDataDescription = weather[0].description;
    this.cityDataDescription = weather[0].description;
    this.cityDataMain = weather[0].main;
    this.dayNight = dayNight;
    /* console.log(timezone);
     console.log(this.dayNight);*/
    switch (true) {
      case this.cityDataDescription === "scattered clouds":
        return Icon.SCATTERRED;
        break;
      case this.cityDataDescription === "broken clouds"
      || this.cityDataDescription === "overcast clouds":
        return Icon.BROKEN;
        break;
      case this.cityDataMain === "Clear" && this.dayNight:
        return Icon.CLEARSKYDAY;
        break;
      case this.cityDataMain === "Clear" && !this.dayNight:
        return Icon.CLEARSKYNIGHT;
        break;
      case this.cityDataMain === "Thunderstorm":
        return Icon.THUNDERSTORM;
        break;
      case this.cityDataMain === "Drizzle":
        return Icon.SHOWER;
        break;
      case this.cityDataDescription === "light intensity shower rain"
      || this.cityDataDescription === "shower rain"
      || this.cityDataDescription === "heavy intensity shower rain"
      || this.cityDataDescription === "ragged shower rain":
        return Icon.SHOWER;
        break;
      case this.cityDataMain === "Rain" && this.dayNight:
        return Icon.RAINDAY;
        break;
      case this.cityDataMain === "Rain" && !this.dayNight:
        return Icon.RAINNIGHT;
        break;
      case this.cityDataMain === "Snow" || this.cityDataDescription === "freezing rain":
        return Icon.SNOW;
        break;
      case this.cityDataDescription === "few clouds" && this.dayNight:
        return Icon.FEWCLOUDSDAY;
        break;
      case this.cityDataDescription === "few clouds" && !this.dayNight:
        return Icon.FEWCLOUDSNIGHT;
        break;
      default:
        return Icon.DEFAULT;
        break;
    }
  }
}
