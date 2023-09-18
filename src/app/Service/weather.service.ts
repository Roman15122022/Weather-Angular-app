import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '2ee8f37454331bd4d00bb4271506044d';
 constructor(private http: HttpClient) {}
  getWeather(city:string){
   return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`);
  }

 }
