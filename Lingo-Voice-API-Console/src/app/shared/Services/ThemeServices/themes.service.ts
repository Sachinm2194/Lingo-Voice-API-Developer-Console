import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private currentTheme: string;
  private themeSubject: BehaviorSubject<string>; // Observable for theme changes

  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light-theme';
    this.themeSubject = new BehaviorSubject<string>(this.currentTheme); // Initialize with the current theme
    this.applyTheme(this.currentTheme);
  }

  setTheme(theme: string): void {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
    this.themeSubject.next(theme); // Emit the new theme to subscribers
  }

  applyTheme(theme: string): void {
    document.body.classList.remove('light-theme', 'dark-theme', 'theme1', 'theme2');
    document.body.classList.add(theme);
  }

  getTheme(): string {
    return this.currentTheme;
  }

  getThemeObservable() {
    return this.themeSubject.asObservable(); // Allow components to subscribe to theme changes
  }
}
