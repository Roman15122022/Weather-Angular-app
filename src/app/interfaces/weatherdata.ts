export interface Weatherdata {
  temperature: number;
  description: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  }
}
