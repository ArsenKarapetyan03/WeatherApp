import type { Weather, WeatherData } from "../model/weather.types.ts";


export const DailyWeatherPage = ({dailyWeatherData}: {dailyWeatherData: WeatherData}) => {


	// console.log(getDailyMaxWeather(dailyWeatherData))
	return (
		<div
			className="flex flex-col gap-2 p-3 text-2xl bg-black/5 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] rounded-lg">
			{dailyWeatherData.list.map(item =>  {
				return (
					<div
						key={item.dt}
						className="text-blue-100 font-bold text-left"
					>

					</div>
				)
			})}

			{dailyWeatherData.list.length}
		</div>
	)
}


function getDailyMaxWeather(data: WeatherData): Weather[] {
	const dailyGroups: Record<string, Weather> = {};

	data.list.forEach((item) => {
		const date = item.dt.split(' ')[0];
		const currentTemp = item.main.temp;

		if (!dailyGroups[date] || currentTemp > dailyGroups[date].main.temp) {
			dailyGroups[date] = item;
		}
	});

	return Object.values(dailyGroups);
}