import { CalendarDays, MoveDown, MoveUp } from "lucide-react";
import type { Weather, WeatherData } from "../model/weather.types.ts";
import { ICON_URL } from "../model/weather.config.ts";
import { CollapsiblePanel } from "custom-ui-components/src/components/CollapsiblePanel.tsx";

export const DailyWeather = ({dailyWeatherData}: { dailyWeatherData: WeatherData }) => {

	const panels = getDailyMaxMinWeather(dailyWeatherData).map(item => {
		return {
			title:
				(<div
					key={item.dt}
					className="w-full flex justify-between text-blue-100 font-bold"
				>
					<div>{new Date(Number(item.dt) * 1000).toLocaleDateString('en-US', {weekday: 'long'})}</div>
					<div className="flex gap-15">
						<img src={ICON_URL + item.weather[0].icon.replace('n', 'd') + ".png"} alt=""/>
						<div className="flex gap-5">
							<div className="flex items-center">
								<MoveDown strokeWidth={3} size={20} className="text-blue-200"/>
								{Math.round(item.main.temp_min)}°
							</div>
							<div className="flex items-center">
								<MoveUp strokeWidth={3} size={20} className="text-blue-200"/>
								{Math.round(item.main.temp_max)}°
							</div>
						</div>
					</div>
				</div>),
			content: "Weather info"
		}
	});

	return (
		<div
			className="mb-4 flex flex-col gap-2 p-3 text-2xl bg-black/10 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] rounded-lg">
			<div className="font-bold text-3xl text-blue-200">
				<CalendarDays className="inline"/>
				<span> 5-day forecast</span>
			</div>

			<CollapsiblePanel
				panels={panels}
				containerStyles="border-none"
				titleStyles="w-full bg-transparent border-b border-gray-200"
				contentStyles="border-none"
				icon={false}
			/>

			<div className="divide-y">
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