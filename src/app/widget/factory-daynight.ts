import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root'})
export class FactoryDaynight{
  setTimeZone(timezone:number): boolean{
    const now = new Date();
    const currentHour = now.getUTCHours() + timezone / 3600;
    return currentHour >= 6 && currentHour < 18;
  }
}
