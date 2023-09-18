import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YourcityService {
  private apiKey = '6124d2ad56353ad813f6c4f4f2d96a4b';
  constructor(private http:HttpClient) { }

  getNameByCoords(latitude: number, longitude: number): Observable<any>{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
    return this.http.get(apiUrl);
  }
}
