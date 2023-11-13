import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = 'http://api.geonames.org/searchJSON';
  private username = 'roma2132';

  constructor(private http: HttpClient) {}

  getCities(): Observable<string[]> {
    const params = new HttpParams()
      .set('name', '')
      .set('maxRows', '1000')
      .set('featureClass', 'P')
      .set('orderby', 'population')
      .set('username', this.username);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(({ geonames }) => geonames.map((city: any) => city.name)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error fetching cities:', error);
    return throwError(error);
  }
}
