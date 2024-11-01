import { CloudIcon, ThermometerIcon } from 'lucide-react';
import { useMemo } from 'react';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@purplefish/cascadia/components/ui/card';

interface WeatherWidgetProps {
  toolOutput: string;
}

export const WeatherWidget = ({ toolOutput }: WeatherWidgetProps) => {
  const data = useMemo(() => {
    try {
      const parsedToolOutput = JSON.parse(toolOutput);
      const typedToolOutput = z
        .object({
          locationName: z.string(),
          country: z.string(),
          temperature: z.number(),
          humidity: z.number(),
          windSpeed: z.number(),
          condition: z.string(),
          icon: z.string(),
          units: z.string(),
        })
        .parse(parsedToolOutput);
      return typedToolOutput;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [toolOutput]);

  if (!data) return null;

  return (
    <Card className="mb-2 w-full max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">
          {data.locationName}, {data.country}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
              className="size-24"
              alt={data.condition}
            />
          </div>
          <div className="text-4xl font-bold">{data.temperature}°F</div>
        </div>
        <div className="mt-4 text-center text-lg">{data.condition}</div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <ThermometerIcon className="mr-2 size-5 text-blue-500" />
            <span>Humidity: {data.humidity}%</span>
          </div>
          <div className="flex items-center">
            <CloudIcon className="mr-2 size-5 text-gray-500" />
            <span>Wind: {data.windSpeed} mph</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
