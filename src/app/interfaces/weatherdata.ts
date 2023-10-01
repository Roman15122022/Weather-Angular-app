export interface Weatherdata {
  temperature: number;
  weather:{
    main: string;
    description: string;
  }
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  }
}
