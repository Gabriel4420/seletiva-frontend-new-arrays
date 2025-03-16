import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '397f0fab662dfe0b1549c41bfd15bf8a'; // Substitua pela sua chave da API

  constructor() {}

  async getWeatherByCity(city: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},BR&appid=${this.apiKey}&units=metric&lang=pt_br`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar a previsão do tempo:', error);
      return null;
    }
  }
}
