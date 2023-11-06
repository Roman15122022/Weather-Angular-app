import {Injectable, ElementRef} from '@angular/core';
import {WidgetUiMode} from "../../widget/WidgetUiMode";
import {WeatherWidget} from "../../interfaces/weatherwidget";
import {map} from "rxjs/operators";
import {WeatherService} from "../weatherservice/weather.service";
import {SlideConfig} from "../../interfaces/slide-config";
import {MatButton} from "@angular/material/button";
import {SlickCarouselComponent} from "ngx-slick-carousel";

export const WIDGET_STORAGE_KEY = 'widgets';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  constructor(private weatherService: WeatherService) {
  }

  serviceData(widget: WeatherWidget) {
    return this.weatherService.getWeather(widget.name)
      .pipe(
        map((data) => new WidgetUiMode(data))
      )
  }

  updateData(data: WidgetUiMode, widget: WeatherWidget) {
    Object.assign(widget, {
      weatherData: data,
      name: data.name,
      main: {
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
      },
      flag: true
    });
  }

  resetWidget(weatherWidgets: WeatherWidget[]) {
    weatherWidgets.forEach((item) => {
      if (item.weatherData != null) {
        Object.assign(item, {
          weatherData: null,
          name: '',
          main: {
            temp: 0,
            temp_min: 0,
            temp_max: 0,
          },
          flag: false,
        })
      }
    })
  }

  getConfigBySize(): SlideConfig {
    const screenWidth = window.innerWidth;
    let slideConfig = {
      slidesToScroll: 3,
      slidesToShow: 3,
      prevArrow: 0,
      nextArrow: 0,
    };

    if (screenWidth < 1000) {
      slideConfig.slidesToScroll = slideConfig.slidesToShow = screenWidth < 687 ? 1 : 2;
    }

    return slideConfig;
  }

  disabledButtons(showWidget: number, weatherWidgets: WeatherWidget[], btnLeft: ElementRef, btnRight: ElementRef, removeLast: MatButton) {
    if (weatherWidgets.length > showWidget) {
      weatherWidgets.length -= 1;
    }
    if (weatherWidgets.length === showWidget) {
      removeLast.color = undefined;
      btnLeft.nativeElement.classList.add('display_none');
      btnRight.nativeElement.classList.add('display_none');
    }
  }

  activeButtons(showWidget: number, weatherWidgets: WeatherWidget[], btnLeft: ElementRef, btnRight: ElementRef, removeLast: MatButton) {
    const newWidget = new WidgetUiMode({} as WeatherWidget);
    weatherWidgets.push(newWidget);
    if (weatherWidgets.length > showWidget) {
      removeLast.color = 'warn';
      btnLeft.nativeElement.classList.remove('display_none');
      btnRight.nativeElement.classList.remove('display_none');
    }
  }

  reSizeWidget(showWidget: number, weatherWidgets: WeatherWidget[], btnLeft: ElementRef, btnRight: ElementRef, removeLast: MatButton, slickModal: SlickCarouselComponent) {
    if (weatherWidgets.length === showWidget) {
      removeLast.color = undefined;
      btnLeft.nativeElement.classList.add('display_none');
      btnRight.nativeElement.classList.add('display_none');
    }
    if (weatherWidgets.length > showWidget) {
      removeLast.color = 'accent';
      btnLeft.nativeElement.classList.remove('display_none');
      btnRight.nativeElement.classList.remove('display_none');
    }
  }
}
