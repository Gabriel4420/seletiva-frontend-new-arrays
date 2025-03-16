import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WeatherDisplayComponent } from '../weather-display/weather-display.component';
import { CommonModule } from '@angular/common';
import { WeatherForecastGridComponent } from '../weather-forecast-grid/weather-forecast-grid.component';
import { ToastService } from '../toast/toast.service';
interface AddressData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: string;
}

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    WeatherDisplayComponent,
    WeatherForecastGridComponent,
  ],
})
export class AddressFormComponent {
  cepValue: string = '';
  addressData: AddressData | null = null;
  weatherData: any = null;
  forecastData: any[] = [];
  cityWeather: string = '';
  constructor(private http: HttpClient, private toastService: ToastService) {}

  onCepChange() {
    if (this.cepValue.length === 8) {
      // Fetch address data from ViaCEP API
      this.http
        .get<AddressData>(`https://viacep.com.br/ws/${this.cepValue}/json/`)
        .subscribe({
          next: (data) => {
            this.addressData = data;
            this.getWeatherData(data.localidade);
            this.toastService.showSuccess('CEP encontrado com sucesso!');
            if (data?.erro) {
              this.toastService.showError('CEP não encontrado');
              this.addressData = null;
              this.weatherData = null;
            }
          },
          error: (error) => {
            this.toastService.showError('Erro ao buscar o CEP:' + error);
            this.addressData = null;
            this.weatherData = null;
          },
        });
    }
  }

  // Update your getWeatherData method to fetch forecast
  private getWeatherData(city: string) {
    const apiKey = process.env['openWeatherApiKey'];
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},BR&appid=${apiKey}&units=metric`
      )
      .subscribe({
        next: (data: any) => {
          if (data.city.name !== '') {
            this.weatherData = data.list[0];
            this.cityWeather = data.city;

            // Get one forecast per day for the next 4 days
            this.forecastData = data.list
              .filter((item: any, index: number) => index % 8 === 0)
              .slice(1, 5);
          }
        },
        error: (error) => {
          this.toastService.showError('Erro ao buscar o CEP:' + error);
          this.weatherData = null;
          this.forecastData = [];
        },
      });
  }
}
