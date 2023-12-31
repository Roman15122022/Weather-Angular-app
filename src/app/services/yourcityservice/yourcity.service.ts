import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {YourCityLocation} from "../../interfaces/yourcitylocation";
import {YourCityData} from "../../interfaces/yourcitydata";


@Injectable({
  providedIn: 'root'
})
export class YourCityService {
  yourCityLocation: YourCityLocation = {
    apiKey: '6124d2ad56353ad813f6c4f4f2d96a4b',
    longitude: 0,
    latitude: 0,
  };

  constructor(private http: HttpClient) {
  }

  getNameByCoords(latitude: number, longitude: number): Observable<YourCityData> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.yourCityLocation.apiKey}&units=metric`;
    return this.http.get<YourCityData>(apiUrl);
  }

  getData(): Observable<YourCityData> {
    return new Observable<YourCityData>((observer) => {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        const {latitude, longitude} = coords;
        this.getNameByCoords(latitude, longitude).subscribe((data) => {
          observer.next(data);
          observer.complete();
        });
      });
    });
  }

}
