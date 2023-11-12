
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  apiKey: string = 'AIzaSyCxuXmy9ov2QXkB15wjhiruf1VvC_Cle90'; /*google place api-key*/
  constructor(private http: HttpClient) {}

  getCities(): Observable<string[]> {
    return this.http.get<string[]>('https://maps.googleapis.com/maps/api/js?key=AIzaSyCxuXmy9ov2QXkB15wjhiruf1VvC_Cle90&libraries=places&callback=initMap');
  }
}
