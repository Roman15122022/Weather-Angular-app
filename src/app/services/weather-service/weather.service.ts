import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherLocation} from "../../interfaces/weatherlocation";
import {Observable} from "rxjs";
import {WeatherWidget} from "../../interfaces/weatherwidget";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherLocation: WeatherLocation = {
    apiKey: '2ee8f37454331bd4d00bb4271506044d',
    data: ''
  };

  constructor(private http: HttpClient) {
  }

  getWeather(city: string): Observable<WeatherWidget> {
    return this.weatherLocation.data = this.http.get<WeatherWidget>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.weatherLocation.apiKey}&units=metric`);
  }

}
