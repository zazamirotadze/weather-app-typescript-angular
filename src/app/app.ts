import { Component, OnInit, signal, WritableSignal, computed } from '@angular/core';
import { languages } from '../data/languages';
import { LanguageMenu } from '../components/languages-menu/language-menu';
import { LocationMenu } from '../components/location-menu/location-menu';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocationRepresentation } from '../components/location-representation/location-representation';
import { locations } from '../data/locations';
import { translations } from '../data/translations';
import {  filter,take } from 'rxjs';
import { Location } from '../types/weather.types';

@Component({
  selector: 'app-root',
  imports: [LanguageMenu, LocationMenu, LocationRepresentation],
  templateUrl: './app.html'
})
export class App implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  selectedLocationName: WritableSignal<null | string> = signal(null);
  selectedLanguageName: WritableSignal<null | string> = signal(null);
  isLoaded: WritableSignal<boolean> = signal(false);
  translations = translations;

  supportedLanguage = computed(() => languages.find(language => language.name === this.selectedLanguageName()) || null);
  supportedLocation = computed<Location | undefined | null>(() => {
    const name = this.selectedLocationName();

    if (!name) return undefined;

    return locations.find(loc => loc.name === name) ?? null;
  });
  
 
 ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      take(1) 
    ).subscribe(() => {
      const 
          params = this.route.snapshot.queryParamMap,
          location = params.get('location'),
          language = params.get('language');
     
      if (location == null && language == null && params.keys.length === 0) {
        this.selectedLocationName.set('Tsrikvali');
        this.selectedLanguageName.set('ka');
      } else {
        this.selectedLocationName.set(location || 'Tsrikvali');
        this.selectedLanguageName.set(language || 'ka');
      }
    });
  }
}
