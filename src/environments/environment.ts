declare const process: any;

export const environment = {
  production: false,
  openWeatherApiKey: process.env['OPENWEATHER_API_KEY'] || ''
};