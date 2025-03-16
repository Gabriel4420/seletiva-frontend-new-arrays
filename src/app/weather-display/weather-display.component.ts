import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from './temperature.pipe';
import { WeatherDescriptionPipe } from '../weather-description.pipe';


@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss'],
  standalone: true,
  imports: [CommonModule, TemperaturePipe, WeatherDescriptionPipe],
})
export class WeatherDisplayComponent {
  @Input() weatherData: any;
  @Input() cityWeather: any;

  getCurrentDay(): string {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const today = new Date().getDay();
    return days[today];
  }

  getWeatherIcon(description: string): string {
    const desc = description.toLowerCase();

    if (desc.includes('partly cloudy') || desc.includes('fast wind')) {
      return 'images/Moon cloud fast wind.png';
    }
    if (desc.includes('mid rain') || desc.includes('broken clouds')) {
      return 'images/Moon cloud mid rain.png';
    }
    if (desc.includes('showers')) {
      return 'images/Sun cloud angled rain.png';
    }
    if (desc.includes('tornado')) {
      return 'images/Tornado.png';
    }
    if (desc.includes('sun') || desc.includes('clear sky')) {
      return 'images/Sun.png';
    }

    // Default icon if no condition matches
    return 'images/Sun.png';
  }
}
