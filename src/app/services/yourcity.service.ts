import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Yourcitylocation} from "../interfaces/yourcitylocation";
import {Yourcitydata} from "../interfaces/yourcitydata";


@Injectable({
  providedIn: 'root'
})
export class YourCityService {
  yourCityLocation: Yourcitylocation = {
    apiKey: '6124d2ad56353ad813f6c4f4f2d96a4b',
    longitude: 0,
    latitude: 0,
  };

  constructor(private http: HttpClient) {
  }

  getNameByCoords(latitude: number, longitude: number): Observable<Yourcitydata> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.yourCityLocation.apiKey}&units=metric`;
    return this.http.get<Yourcitydata>(apiUrl);
  }
}
