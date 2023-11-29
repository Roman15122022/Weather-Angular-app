import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {YourCityLocation} from "../../interfaces/yourcitylocation";
import {YourCityData} from "../../interfaces/yourcitydata";

export const CITY_STORAGE_KEY = 'city';

@Injectable({
  providedIn: 'root'
})
export class YourCityService {
  yourCityLocation: YourCityLocation = {
    apiKey: '6124d2ad56353ad813f6c4f4f2d96a4b',
    longitude: -100,
    latitude: -100,
  };
  city: string | null = '';

  constructor(private http: HttpClient) {
  }

  getDataByCoords(latitude: number, longitude: number): Observable<YourCityData> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.yourCityLocation.apiKey}&units=metric`;
    return this.http.get<YourCityData>(apiUrl);
  }

  getDataByName(city: string): Observable<YourCityData> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.yourCityLocation.apiKey}&units=metric`;
    return this.http.get<YourCityData>(apiUrl);
  }

  getCoords() {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      const {latitude, longitude} = coords;
      this.yourCityLocation.longitude = longitude;
      this.yourCityLocation.latitude = latitude;
    }, (geolocationError) => {
      if (geolocationError.code === GeolocationPositionError.PERMISSION_DENIED) {
        if (!localStorage.getItem(CITY_STORAGE_KEY)) {
          this.city = prompt('User denied Geolocation. Enter your city');
          localStorage.setItem(CITY_STORAGE_KEY, JSON.stringify(this.city));
        }
      } else if (geolocationError.code === GeolocationPositionError.POSITION_UNAVAILABLE) {
        alert('Geolocation information is unavailable.');
      } else if (geolocationError.code === GeolocationPositionError.TIMEOUT) {
        alert('Geolocation request timed out.');
      } else {
        alert('Error getting geolocation: ' + (geolocationError.message || 'Unknown error'));
      }
    }, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0});
  }

  getData(city: string): Observable<YourCityData> {
    return new Observable<YourCityData>((observer) => {
      if (this.yourCityLocation.longitude === -100) {
        if (this.city !== null) {
          this.getDataByName(city).subscribe((data) => {
            observer.next(data);
            observer.complete();
          });
        } else {
          console.log('Canceled');
        }
      } else {
        this.getDataByCoords(this.yourCityLocation.latitude, this.yourCityLocation.longitude)
          .subscribe((data) => {
            observer.next(data);
            observer.complete();
          });
      }
    });
  }
}
