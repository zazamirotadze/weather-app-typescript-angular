import { Component, Input, Signal, WritableSignal, signal } from '@angular/core';
import { languages } from '../../data/languages';
import { Language } from '../../types/weather.types';
import { translations } from '../../data/translations';
import { ClickOutside } from '../../services/click-outside';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-language-menu',
  imports: [ClickOutside],
  templateUrl: './languages.html'
})
export class LanguageMenu {
  constructor(private router: Router, private route: ActivatedRoute) {}
  languages: Language[] = languages;
  translations = translations;
  isOpen: WritableSignal<boolean> = signal(false); 
  @Input() selectedLanguageName! : WritableSignal<null | string>;
  @Input() supportedLanguage! : Signal<null | Language>;
  
  setLanguage(language: string) {
    this.selectedLanguageName.set(language);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { language: language },
      queryParamsHandling: 'merge' 
    });
  }
}
