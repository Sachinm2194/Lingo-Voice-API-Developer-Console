import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { UsagesComponent } from './Pages/usages/usages.component';
import { PlaygroundComponent } from './Pages/playground/playground.component';
import { ApiKeysComponent } from './Pages/api-keys/api-keys.component';
import { SettingsComponent } from './Pages/settings/settings.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsagesComponent,
    PlaygroundComponent,
    ApiKeysComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
