export interface CityData {
  name: string;
  temp: number;
  wind:{
    speed: number
  }
  main: {
    humidity: number
  }
  weather: {
    description: string;
  }[];
}

