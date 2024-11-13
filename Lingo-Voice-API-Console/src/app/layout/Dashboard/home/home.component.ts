import { Component } from '@angular/core';
import { ThemesService } from '../../../shared/Services/ThemeServices/themes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private themeService: ThemesService) {}

  setTheme(theme: string): void {
    this.themeService.setTheme(theme);
    // console.log(this.themeService.setTheme(ss));
  }
}
