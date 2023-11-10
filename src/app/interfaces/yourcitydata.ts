export interface YourCityData {
  name: string,
  weather: WeatherData[];
  wind:{
    speed: number
  }
  main: {
    temp: number
    humidity: number
  },
}

export interface WeatherData {
  description: string;

}
