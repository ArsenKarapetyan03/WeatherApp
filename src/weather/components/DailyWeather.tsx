import {CalendarDays, MoveDown, MoveUp} from "lucide-react";
import type {Weather, WeatherData} from "../model/weather.types.ts";
import {ICON_URL} from "../model/weather.config.ts";

export const DailyWeather = ({dailyWeatherData}: { dailyWeatherData: WeatherData }) => {

	return (
		<div className="mb-4 flex flex-col gap-2 p-3 text-2xl bg-black/10 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] rounded-lg">
			<div className="font-bold text-3xl text-blue-200">
				<CalendarDays className="inline"/>
				<span> 5-day forecast</span>
			</div>
			<div className="divide-y">
				{getDailyMaxMinWeather(dailyWeatherData).map(item => {
					return (
						<div
							key={item.dt}
							className="flex justify-between text-blue-100 font-bold text-left"
						>
							<div>{new Date(Number(item.dt) * 1000).toLocaleDateString('en-US', {weekday: 'long'})}</div>
							<div className="flex justify-between gap-2">
								<img src={ICON_URL + item.weather[0].icon.replace('n', 'd') + ".png"}/>
								<div className="flex items-center">
									<MoveDown strokeWidth={3} size={20} className="text-blue-200" />
									{Math.round(item.main.temp_min)}°
								</div>
								<div className="flex items-center">
									<MoveUp strokeWidth={3} size={20} className="text-blue-200" />
									{Math.round(item.main.temp_max)}°
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

function getDailyMaxMinWeather(data: WeatherData): Weather[] {
	const dailyGroups = data.list.reduce<Record<string, Weather>>((acc, item) => {
		const date = new Date(Number(item.dt) * 1000).toISOString().split('T')[0];
		const {temp} = item.main;

		if (!acc[date]) {
			acc[date] = {
				...item,
				main: {...item.main, temp_min: temp, temp_max: temp}
			};
		} else {
			const main = acc[date].main;
			main.temp_min = Math.min(main.temp_min, temp);
			main.temp_max = Math.max(main.temp_max, temp);
		}

		return acc;
	}, {});

	return Object.values(dailyGroups);
}