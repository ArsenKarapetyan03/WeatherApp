import { useContext } from "react";
import { CalendarDays, MoveDown, MoveUp } from "lucide-react";
import { CollapsiblePanel } from "custom-ui-components/src/components/CollapsiblePanel.tsx";
import { WeatherContext } from "../hooks/Provider.tsx";
import type { Weather, WeatherData } from "../model/weather.types.ts";
import { ICON_URL } from "../model/weather.config.ts";
import { useUnitConverter } from "../hooks/useUnitConverter.ts";
import { windConverter } from "../helpers/windConverter.ts";

export const DailyWeather = ({dailyWeatherData}: {dailyWeatherData: WeatherData}) => {

	const {tempUnit} = useContext(WeatherContext);

	const convert = useUnitConverter();

	const panels = getDailyMaxMinWeather(dailyWeatherData).map(item => {
		const {main, wind, weather} = item;

		return {
			title:
				(<div
					key={item.dt}
					className="w-full p-2 flex justify-between text-blue-100 font-bold rounded hover:bg-black/5 transition-all duration-200"
				>
					<div>{new Date(Number(item.dt) * 1000).toLocaleDateString('en-US', {weekday: 'long'})}</div>
					<div className="flex gap-15">
						<div className="flex gap-5">
							<div className="flex items-center">
								<MoveDown strokeWidth={3} size={20} className="text-blue-200"/>
								{convert(main.temp_min)}°
							</div>
							<div className="flex items-center">
								<MoveUp strokeWidth={3} size={20} className="text-blue-200"/>
								{convert(main.temp_max)}°
							</div>
						</div>
						<img src={ICON_URL + item.weather[0].icon.replace('n', 'd') + ".png"} alt=""/>
					</div>
				</div>),
			content: (
				<div className="flex justify-evenly">
					<div className="flex justify-center">
						<div className="text-7xl text-white font-bold">{convert(main.temp)}</div>
						<span className="text-xl text-blue-100 font-bold">o</span>
						<span className="text-4xl text-blue-100 font-bold pt-4">{tempUnit}</span>
					</div>

					<div className="text-blue-200 font-bold text-left">
						<div>Feels like {convert(main.feels_like)}°</div>
						<div>Humidity {main.humidity}%</div>
						<div>Wind speed {windConverter(wind.speed)} km/h</div>
						<div className="flex">{weather[0].description}</div>
					</div>
				</div>
			)
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