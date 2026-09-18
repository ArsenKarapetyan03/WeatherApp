export interface Weather {
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
	dt: string;
}

export interface WeatherData {
	name: string;
	list: Weather[];
}