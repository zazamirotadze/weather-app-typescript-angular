import { Component, OnInit, signal, WritableSignal, computed } from '@angular/core';
import { languages } from '../data/languages';
import { LanguageMenu } from '../components/languages-menu/language-menu';
import { LocationMenu } from '../components/location-menu/location-menu';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationRepresentation } from '../components/location-representation/location-representation';
import { locations } from '../data/locations';
import { translations } from '../data/translations';

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
  supportedLocation = computed(() => locations.find(location => location.name === this.selectedLocationName()) || null);
  
  ngOnInit(): void {   
    this.route.queryParamMap.subscribe(params => {
      this.selectedLocationName.set(params.get('location') || 'Tsrikvali');
      this.selectedLanguageName.set(params.get('language') || 'ka');
    });
  }
}
