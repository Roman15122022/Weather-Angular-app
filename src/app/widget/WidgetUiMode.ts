import { WeatherData, WeatherWidget } from "../interfaces/weatherwidget";
import { Icon } from "./enum.icon";

export class WidgetUiMode implements WeatherWidget {
  city: string;
  weatherData: WeatherData;
  cityTemp: number;
  cityMaxTemp: number;
  cityMinTemp: number;
  IconSrc: Icon;
  TimeZone: number;
  weather: WeatherData[];

  constructor({
                city = "", weatherData = null, cityTemp = 0, cityMaxTemp = 0, IconSrc = Icon.DEFAULT, TimeZone = 0, weather = [
      { description: "", main: "" }
    ], cityMinTemp = 0
              }: WeatherWidget) {
    this.city = city;
    this.weatherData = weatherData;
    this.cityTemp = Math.round(cityTemp);
    this.cityMaxTemp = Math.round(cityMaxTemp);
    this.IconSrc = IconSrc;
    this.TimeZone = TimeZone;
    this.weather = weather;
    this.cityMinTemp = Math.round(cityMinTemp);
  }
}
