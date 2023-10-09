import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherLocation} from "../interfaces/weatherlocation";
import {WeatherData} from "../interfaces/weatherdata";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherlocation: WeatherLocation = {
    apiKey: '2ee8f37454331bd4d00bb4271506044d',
    data: ''
  };

  constructor(private http: HttpClient) {
  }

  getWeather(city: string): Observable<WeatherData> {
    return this.weatherlocation.data = this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.weatherlocation.apiKey}&units=metric`);
  }

}
