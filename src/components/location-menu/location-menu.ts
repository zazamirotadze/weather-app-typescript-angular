import { Component, Input, Signal, WritableSignal, signal } from '@angular/core';
import { ClickOutside } from '../../services/click-outside';
import { Language, Location } from '../../types/weather.types';
import { locations } from '../../data/locations';
import { translations } from '../../data/translations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-menu',
  imports: [ClickOutside],
  templateUrl: './location-menu.html'
})
export class LocationMenu {
  constructor(private router: Router, private route: ActivatedRoute) {}
  locations: Location[] = locations;
  translations = translations;
  isOpen: WritableSignal<boolean> = signal(false); 

  @Input() selectedLocationName! : WritableSignal<null | string>;
  @Input() supportedLocation! : Signal<null | undefined | Location>;
  @Input() supportedLanguage! : Signal<null | Language>;
  @Input() isLoaded! : WritableSignal<boolean>;

  setLocation(locationName: string) {
    this.selectedLocationName.set(locationName);
    this.isLoaded.set(false);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { location: locationName },
      queryParamsHandling: 'merge' 
    });
  }
}
