import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Location } from '../types/weather.types';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Weatherapi {
  constructor(private http: HttpClient) {}
  
  detData(supportedLocation: Omit<Location, 'name'> ){
    if (environment.weatherApiKey){
      if (!environment.weatherApiKey) {
        return throwError(() => new Error('API key is missing'));
      }
    }

    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${supportedLocation.lat}&lon=${supportedLocation.lon}&appid=${environment.weatherApiKey}&units=metric`);
  }
}
