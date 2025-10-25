import { Component, computed, effect, Input, signal, Signal, WritableSignal } from '@angular/core';
import { Weatherapi } from '../../services/weatherapi';
import { Language, Location, WeatherData, SupportedLocations, SupportedLanguages } from '../../types/weather.types';
import { translations } from '../../data/translations';
import { RenderWeatherIcon } from './render-weather-icon/render-weather-icon';
import { convertIntoGeorgianDate } from '../../util/convertIntoGeorgianDate';
import { RenderWeatherInfo } from './render-weather-info/render-weather-info';
import { finalize, timer } from 'rxjs';

@Component({
  selector: 'app-location-representation',
  imports: [RenderWeatherIcon, RenderWeatherInfo],
  templateUrl: './location-representation.html'
})
export class LocationRepresentation {
  weatherData: WritableSignal<WritableSignal<WeatherData>[] | null> = signal(null);
  currenctWeather = computed(() => this.weatherData()?.[0]?.() || null);
  futureWeathers = computed(() => this.weatherData()?.slice(1) || null);
  convertIntoGeorgianDate = convertIntoGeorgianDate;
  translations = translations;

  @Input() supportedLocation!: Signal<null | undefined | Location>;
  @Input() supportedLanguage!: Signal<null | Language>;
  @Input() isLoaded!: WritableSignal<boolean>;

  translatedLocationName = computed(() => this.translations.locations[this.supportedLocation()?.name as SupportedLocations][this.supportedLanguage()?.name as SupportedLanguages]);
  constructor(private weatherApi: Weatherapi) {
    effect(() => {
      // supportedLocation ჯერ არ გამოთვლილა ლოკაცია რომლის მიხედვითაც 
      // უნდა მოვიტანოთ მონაცემები აპლიკაციური სამოქმედო ველიდან 
      // ამის აღსანიშნავად გამოიყენება მნიშვნელობა undefined
      if (this.supportedLocation() === undefined) {
        return;
      }
      if (this.supportedLocation() === null) {
        this.weatherData.set(null)
        this.isLoaded.set(true)

        return;
      }

      this.weatherApi.detData({ lat: this.supportedLocation()!.lat, lon: this.supportedLocation()!.lon })
        .pipe(finalize(() => this.isLoaded.set(true)))
        .subscribe({
          next: (data: any) => {
            const uniqueDates = new Set();
            const uniqueObjects: WritableSignal<WeatherData>[] = [];
            data.list.forEach((element: any) => {
              const currentDate = element.dt_txt.split(' ')[0];

              if (!uniqueDates.has(currentDate)) {
                uniqueDates.add(currentDate);
                uniqueObjects.push(signal(element));
              }
            })
            this.weatherData.set(uniqueObjects);
          },
          error: () => {
            this.weatherData.set(null);
          }
        });
    })
  }
}
