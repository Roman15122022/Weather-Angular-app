import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weatherlocation} from "../interfaces/weatherlocation";
import {Weatherdata} from "../interfaces/weatherdata";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherlocation: Weatherlocation = {
    city: 'Kyiv',
    apiKey: '2ee8f37454331bd4d00bb4271506044d',
    data: ''
  };

  constructor(private http: HttpClient) {
  }

  getWeather(city: string): Observable<Weatherdata> {
    return this.weatherlocation.data = this.http.get<Weatherdata>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.weatherlocation.apiKey}&units=metric`);
  }

}
