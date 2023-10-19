import { WeatherData, WeatherWidget } from "../interfaces/weatherwidget";

export class WidgetUiMode implements WeatherWidget {
  id: number;
  name: string;
  flag: boolean;
  weatherData: WeatherData;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };

  weather: WeatherData[];

  constructor({
                id,
                name = "",
                flag = true,
                weatherData = null,
                main = {
                  temp_max: 0,
                  temp_min: 0,
                  temp: 0,
                },
                weather = [{ description: "", main: "", icon: "" }],
              }: WeatherWidget) {
    this.id = id || this.generateId();
    this.name = name;
    this.flag = flag;
    this.weatherData = weatherData;
    this.main = {
      temp: Math.round(main.temp),
      temp_min: Math.round(main.temp_min),
      temp_max: Math.round(main.temp_max),
    };
    this.weather = weather;
  }
  generateId(){
    return Math.floor(Math.random()* 100) + 1;
  }
}
