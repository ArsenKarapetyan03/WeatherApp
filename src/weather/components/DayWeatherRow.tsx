import { useUnitConverter } from "../hooks/useUnitConverter.ts";
import type { Weather } from "../model/weather.types.ts";
import { MoveDown, MoveUp } from "lucide-react";
import { createIconUrl } from "../helpers/createIconUrl.ts";

export const DayWeatherRow = ({dayWeather}: {dayWeather: Weather }) => {
	const convert = useUnitConverter();

	return (<div
		key={dayWeather.dt}
		className="w-full p-2 flex justify-between text-blue-100 font-bold rounded hover:bg-black/5 transition-all duration-200"
	>
		<div>{new Date(Number(dayWeather.dt) * 1000).toLocaleDateString('en-US', {weekday: 'long'})}</div>
		<div className="flex gap-15">
			<div className="flex gap-5">
				<div className="flex items-center">
					<MoveDown strokeWidth={3} size={20} className="text-blue-200"/>
					{convert(dayWeather.main.temp_min)}°
				</div>
				<div className="flex items-center">
					<MoveUp strokeWidth={3} size={20} className="text-blue-200"/>
					{convert(dayWeather.main.temp_max)}°
				</div>
			</div>
			<img src={createIconUrl(dayWeather.weather[0].icon.replace("n","d"))} alt=""/>
		</div>
	</div>)
}