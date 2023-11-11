
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  apiKey: string = 'AIzaSyAI65A5uc4QaS6zceIpz6QABAV_2Gwnito'; /*google place api-key*/
  constructor(private http: HttpClient) {}

  getCities(): Observable<string[]> {
    return this.http.get<string[]>('');
  }
}
