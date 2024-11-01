// https://js.langchain.com/v0.2/docs/integrations/tools/
import { DynamicTool } from '@langchain/core/tools';
import axios from 'axios';

import { ToolName } from '@/constants/tool-names';

const OPENWEATHERMAP_API_KEY = '652344b8f5336f58308973aee3470e62';
export const weatherTool = new DynamicTool({
  name: ToolName.WEATHER,
  description:
    'Get the weather forecast for a location, including the current temperature, and the high and low temperatures for the day.',
  func: async (locationName) => {
    const geoLocationResponse = await axios.request<
      {
        lat: number;
        lon: number;
        name: string;
        country: string;
        state: string;
      }[]
    >({
      method: 'GET',
      url: 'http://api.openweathermap.org/geo/1.0/direct',
      params: {
        q: locationName,
        appid: OPENWEATHERMAP_API_KEY,
        limit: 1,
      },
    });

    const location = geoLocationResponse.data[0];

    if (!location) {
      throw new Error(`No location found for: ${locationName}`);
    }

    const weatherResponse = await axios.request<{
      lat: number;
      lon: number;
      current: {
        temp: number;
        humidity: number;
        wind_speed: number;
        weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
        }[];
      };
    }>({
      method: 'GET',
      url: 'https://api.openweathermap.org/data/3.0/onecall',
      params: {
        lat: location.lat,
        lon: location.lon,
        units: 'imperial',
        appid: OPENWEATHERMAP_API_KEY,
      },
    });

    if (!weatherResponse.data.current) {
      throw new Error(`No weather data found for: ${locationName}`);
    }

    return JSON.stringify(
      {
        locationName: location.name,
        country: location.country,
        temperature: weatherResponse.data.current.temp,
        humidity: weatherResponse.data.current.humidity,
        windSpeed: weatherResponse.data.current.wind_speed,
        condition: weatherResponse.data.current.weather[0]!.description,
        icon: weatherResponse.data.current.weather[0]!.icon,
        units: 'imperial',
      },
      null,
      2,
    );
  },
});
