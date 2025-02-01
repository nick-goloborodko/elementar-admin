import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_KEY = 'selectedLanguage';

  constructor() { }

  getCurrentLanguage(): string {
    return localStorage.getItem(this.LANGUAGE_KEY) || this.detectBrowserLanguage();
  }

  setCurrentLanguage(language: string): void {
    localStorage.setItem(this.LANGUAGE_KEY, language);
  }

  private detectBrowserLanguage(): string {
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'es', 'ru', 'en-NZ'];
    return supportedLangs.includes(browserLang) ? browserLang : 'en';
  }
}
