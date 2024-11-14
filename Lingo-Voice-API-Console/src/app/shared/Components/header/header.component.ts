import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ThemesService } from '../../Services/ThemeServices/themes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  icons: { [key: string]: SafeHtml } = {
    lightThemeMenuIcon: '',
    darkThemeMenuIcon: '',
    lightThemeDocsIcon: '',
    darkThemeDocsIcon: '',
  };
  currentMenuIcon: SafeHtml | undefined;
  currentDocsIcon: SafeHtml | undefined;

  constructor(
    private themeService: ThemesService,
    private sanitizer: DomSanitizer
  ) {}
  @Output() toggleSidebar = new EventEmitter<void>();  // Event to toggle sidebar

  ngOnInit(): void {
    this.icons['lightThemeMenuIcon'] = this.sanitizeSVG(`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256">
        <path d="M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128ZM40,68H216a4,4,0,0,0,0-8H40a4,4,0,0,0,0,8ZM216,188H40a4,4,0,0,0,0,8H216a4,4,0,0,0,0-8Z"></path>
      </svg>
    `);

    this.icons['darkThemeMenuIcon'] = this.sanitizeSVG(`
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ffffff" viewBox="0 0 256 256">
        <path d="M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128ZM40,68H216a4,4,0,0,0,0-8H40a4,4,0,0,0,0,8ZM216,188H40a4,4,0,0,0,0,8H216a4,4,0,0,0,0-8Z"></path>
      </svg>
    `);
    this.icons['lightThemeDocsIcon'] = this.sanitizeSVG(`
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000000" viewBox="0 0 256 256"><path d="M232,52H160a36,36,0,0,0-32,19.54A36,36,0,0,0,96,52H24a4,4,0,0,0-4,4V200a4,4,0,0,0,4,4H96a28,28,0,0,1,28,28,4,4,0,0,0,8,0,28,28,0,0,1,28-28h72a4,4,0,0,0,4-4V56A4,4,0,0,0,232,52ZM96,196H28V60H96a28,28,0,0,1,28,28V209.4A35.93,35.93,0,0,0,96,196Zm132,0H160a35.94,35.94,0,0,0-28,13.41V88a28,28,0,0,1,28-28h68Z"></path></svg>
    `);

    this.icons['darkThemeDocsIcon'] = this.sanitizeSVG(`
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ffffff" viewBox="0 0 256 256"><path d="M232,52H160a36,36,0,0,0-32,19.54A36,36,0,0,0,96,52H24a4,4,0,0,0-4,4V200a4,4,0,0,0,4,4H96a28,28,0,0,1,28,28,4,4,0,0,0,8,0,28,28,0,0,1,28-28h72a4,4,0,0,0,4-4V56A4,4,0,0,0,232,52ZM96,196H28V60H96a28,28,0,0,1,28,28V209.4A35.93,35.93,0,0,0,96,196Zm132,0H160a35.94,35.94,0,0,0-28,13.41V88a28,28,0,0,1,28-28h68Z"></path></svg>
    `);

    this.updateMenuIcon();

    this.themeService.getThemeObservable().subscribe((theme) => {
      this.updateMenuIcon();
    });
  }

  private updateMenuIcon(): void {
    const currentTheme = this.themeService.getTheme();
    if (currentTheme === 'light-theme') {
      this.currentMenuIcon = this.icons['lightThemeMenuIcon'];
      this.currentDocsIcon = this.icons['lightThemeDocsIcon'];
    } else if (currentTheme === 'dark-theme') {
      this.currentMenuIcon = this.icons['darkThemeMenuIcon'];
      this.currentDocsIcon = this.icons['darkThemeDocsIcon'];
    }
  }

  private sanitizeSVG(svgContent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }

  onMenuToggle(): void {
    this.toggleSidebar.emit();
  }
}
