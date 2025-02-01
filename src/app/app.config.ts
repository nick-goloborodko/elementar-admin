import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter, TitleStrategy, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { environment } from '../environments/environment';
import { ENVIRONMENT, EnvironmentService, GlobalStore, PageTitleStrategyService } from '@elementar/components/core';
import { provideI18n } from '@angular/localize';
import { LanguageService } from './services/language.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideNativeDateAdapter(),
    provideI18n(),
    provideAppInitializer(() => {
      const envService = inject(EnvironmentService);
      const globalStore = inject(GlobalStore);
      const languageService = inject(LanguageService);
      return new Promise((resolve, reject) => {
        globalStore.setPageTitle(envService.getValue('pageTitle'));
        const savedLanguage = languageService.getCurrentLanguage();
        languageService.setCurrentLanguage(savedLanguage);
        resolve(true);
      });
    }),
    {
      provide: ENVIRONMENT,
      useValue: environment
    },
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategyService
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    }
  ]
};
