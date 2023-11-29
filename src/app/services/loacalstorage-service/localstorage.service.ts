import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key:string){
    return JSON.parse(localStorage.getItem(key) || '');
  }

  resetItem(key: string) {
    localStorage.removeItem(key);
  }
}
