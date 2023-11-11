import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';

import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WeatherService} from "./services/weather-service/weather.service";
import {WidgetComponent} from './widget/widget.component';
import {YourCityComponent} from './yourcity/yourcity.component';
import {AppRoutingModule} from './app-routing.module';
import {LayoutSiteComponent} from './layoutsite/layoutsite.component';
import {SlickCarouselModule} from "ngx-slick-carousel";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
    YourCityComponent,
    LayoutSiteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    SlickCarouselModule,
    MatInputModule
  ],
  providers: [
    WeatherService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
