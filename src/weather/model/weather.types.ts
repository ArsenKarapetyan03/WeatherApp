export interface Weather {
	main: {
		temp: number;
		temp_min: number;
		temp_max: number;
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
			icon: string;
		}
	];
	dt: string;
}

export interface WeatherData {
	name: string;
	list: Weather[];
}