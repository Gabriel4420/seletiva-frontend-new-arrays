import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherDescription',
  standalone: true
})
export class WeatherDescriptionPipe implements PipeTransform {
  transform(description: string): string {
    const translations: { [key: string]: string } = {
      'clear sky': 'céu limpo',
      'few clouds': 'poucas nuvens',
      'scattered clouds': 'nuvens dispersas',
      'broken clouds': 'nuvens quebradas',
      'shower rain': 'chuva forte',
      'rain': 'chuva',
      'thunderstorm': 'tempestade',
      'snow': 'neve',
      'mist': 'neblina',
      'overcast clouds': 'nublado',
      'light rain': 'chuva leve',
      'moderate rain': 'chuva moderada',
      'heavy intensity rain': 'chuva intensa',
      'partly cloudy': 'parcialmente nublado',
      'fast wind': 'ventos fortes',
      'mid rain': 'chuva média',
      'showers': 'pancadas de chuva',
      'tornado': 'tornado'
    };

    return translations[description.toLowerCase()] || description;
  }
}