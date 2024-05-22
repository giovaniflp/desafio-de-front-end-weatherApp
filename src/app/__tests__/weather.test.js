
jest.mock('axios');

import React from 'react';
import weather from './weather';

import { render, screen } from '@testing-library/react';

test('getWeather fetches weather data for a city and sets state correctly', async () => {
  const city = 'Recife';
  const mockResponse = {
    data: {
      location: { name: city },
      current: {
        condition: { text: 'Sunny', icon: 'https://example.com/weather.png' },
        temp_c: 25,
        wind_kph: 10,
        humidity: 70,
      },
      forecast: {
        forecastday: [
          {
            day: { maxtemp_c: 30, mintemp_c: 20 },
            astro: { sunrise: '06:00', sunset: '18:00' },
            hour: [
              { temp_c: 22 }, // Dawn temp
              { temp_c: 28 }, // Morning temp (assuming hour 5)
              { temp_c: 30 }, // Afternoon temp (assuming hour 10)
              { temp_c: 23 }, // Night temp (assuming hour 15)
              { condition: { icon: 'https://example.com/night.png' } }, // Night icon (assuming hour 21)
            ],
          },
        ],
      },
    },
  };

  axios.get.mockResolvedValueOnce(mockResponse);

  await getWeather(city);

  expect(setLocation).toHaveBeenCalledWith(city);
  expect(setCondition).toHaveBeenCalledWith(mockResponse.data.current.condition.text);
  expect(setIcon).toHaveBeenCalledWith(mockResponse.data.current.condition.icon);
  expect(setActualTemp).toHaveBeenCalledWith(mockResponse.data.current.temp_c);
  expect(setMaxTemp).toHaveBeenCalledWith(mockResponse.data.forecast.forecastday[0].day.maxtemp_c);
  expect(setMinTemp).toHaveBeenCalledWith(mockResponse.data.forecast.forecastday[0].day.mintemp_c);
  expect(setWindSpeedy).toHaveBeenCalledWith(mockResponse.data.current.wind_kph);
  expect(setSunrise).toHaveBeenCalledWith(mockResponse.data.forecast.forecastday[0].astro.sunrise);
  expect(setSunset).toHaveBeenCalledWith(mockResponse.data.forecast.forecastday[0].astro.sunset);
  expect(setHumidity).toHaveBeenCalledWith(mockResponse.data.current.humidity);

  expect(setDawn).toHaveBeenCalledWith(mockResponse.data.forecast.forecastday[0].hour[0].temp_c);
  expect(setMorning).toHaveBeenCalledWith(mockResponse.data.forecast.forecastday[0].hour[5].temp_c); // Assuming hour 5 for morning
  expect(setAfternoon).toHaveBeenCalledWith(mockResponse.data.forecast.forecastday[0].hour[10].temp_c); // Assuming hour 10 for afternoon
  expect(setNight).toHaveBeenCalledWith(mockResponse.data.forecast.forecastday[0].hour[15].temp_c); // Assuming hour 15 for night

  expect(setDawnImage).toHaveBeenCalledWith('https://example.com/night.png'); // Assuming night icon at hour 21
  expect(morningImage).toBe(''); // No morning image set explicitly
  expect(afternoonImage).toBe(''); // No afternoon image set explicitly
  expect(nightImage).toBe('https://example.com/night.png'); // Night image set explicitly
});

test('getWeather handles errors gracefully', async () => {
  const city = 'Recife';
  const error = new Error('Network Error');
  axios.get.mockRejectedValueOnce(error);

  console.error = jest.fn(); 

  await getWeather(city);

  expect(console.error).toHaveBeenCalledWith('Error fetching weather data:', error);
});