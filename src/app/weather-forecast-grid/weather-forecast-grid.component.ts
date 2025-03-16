import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from '../weather-display/temperature.pipe';
import { WeatherDescriptionPipe } from '../weather-description.pipe';

@Component({
  selector: 'app-weather-forecast-grid',
  standalone: true,
  imports: [CommonModule, TemperaturePipe, WeatherDescriptionPipe],
  templateUrl: './weather-forecast-grid.component.html',
  styleUrls: ['./weather-forecast-grid.component.scss'],
})
export class WeatherForecastGridComponent {
  @Input() forecastData: any[] = [];
  @Input() cityWeather: any;
  getWeatherIcon(description: string): string {
    const desc = description.toLowerCase();

    if (
      desc.includes('heavy intensity drizzle') ||
      desc.includes('fast wind') ||
      desc.includes('light intensity drizzle') ||
      desc.includes('drizzle') ||
      desc.includes('	light intensity drizzle rain') ||
      desc.includes('	heavy intensity drizzle rain') ||
      desc.includes('	shower rain and drizzle') ||
      desc.includes('	heavy shower rain and drizzle ') ||
      desc.includes('	shower drizzle')
    ) {
      return 'images/Moon cloud fast wind.png';
    }
    if (desc.includes('mid rain') || desc.includes('broken clouds')) {
      return 'images/Moon cloud mid rain.png';
    }
    if (
      desc.includes('light rain') ||
      desc.includes('moderate rain') ||
      desc.includes('heavy intensity rain') ||
      desc.includes('very heavy rain') ||
      desc.includes('extreme rain') ||
      desc.includes('freezing rain') ||
      desc.includes('light intensity shower rain') ||
      desc.includes('shower rain') ||
      desc.includes('heavy intensity shower rain') ||
      desc.includes('ragged shower rain')
    ) {
      return 'images/Sun cloud angled rain.png';
    }
    if (desc.includes('tornado')) {
      return 'images/Tornado.png';
    }
    if ( desc.includes('clear sky')) {
      return 'images/Sun.png';
    }

    // Default icon if no condition matches
    return 'images/Sun.png';
  }

  getDayOfWeek(date: string): string {
    const days = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  }
}