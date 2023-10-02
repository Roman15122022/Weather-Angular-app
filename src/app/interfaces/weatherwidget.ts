import {Icon} from "../widget/enum.icon";

export interface WeatherWidget {
  city: string;
  weatherData: any;
  cityTemp: number;
  cityMaxTemp: number;
  cityMinTemp: number;
  IconSrc: Icon;
}
