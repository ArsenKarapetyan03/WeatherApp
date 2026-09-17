export interface WeatherData {
	name: string;
	main: {
		temp: number;
		feels_like: number;
		humidity: number;
	};
	clouds: Record<string, number>;
	wind: {
		speed: number;
	};
	weather: [
		{
			description: string;
		}
	];
}

export interface DailyWeatherData {
	list: Omit<WeatherData, 'name'>[];
}
