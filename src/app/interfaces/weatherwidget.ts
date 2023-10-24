export interface WeatherWidget {
  id: number;
  name: string;
  flag: boolean;
  weatherData: any;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };

  weather: WeatherData[];
}

export interface WeatherData {
  description: string;
  main: string;
  icon: string;
}
