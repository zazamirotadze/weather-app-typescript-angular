import { Component, computed, Input, Signal, WritableSignal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloud, faCloudRain, faSnowflake, faSun } from '@fortawesome/free-solid-svg-icons';
import { WeatherData } from '../../../types/weather.types';

@Component({
  selector: 'app-render-weather-icon',
  imports: [FontAwesomeModule],
  templateUrl: './render-weather-icon.html'
})

export class RenderWeatherIcon {
  faIcons = {faCloud, faCloudRain, faSnowflake, faSun}
  currentHour = new Date().getHours()
  @Input() iconSize!: number;
  @Input() weatherCondition! : Signal<WeatherData | null>;
}
