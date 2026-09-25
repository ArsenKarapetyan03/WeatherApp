import { useUnitConverter } from "../hooks/useUnitConverter.ts";
import { HourlyWeather } from "./HourlyWeather.tsx";
import { windConverter } from "../helpers/windConverter.ts";
import type { Weather } from "../model/weather.types.ts";
import { useContext } from "react";
import { WeatherContext } from "../hooks/Provider.tsx";

interface DailyWeatherItem extends Weather {
	hourlyList: Weather[];
}

export const DayWithHourlyWeather = ({dayWeather}: {dayWeather: DailyWeatherItem }) => {
	const {tempUnit} = useContext(WeatherContext);
	const convert = useUnitConverter();
	const {main, wind, weather} = dayWeather;

	return (
		<div className="flex flex-col gap-5 py-2">
			<div className="flex justify-evenly items-center">
				<div className="flex justify-center">
					<span className="text-7xl text-white font-bold">{convert(main.temp_max)}</span>
					<span className="text-xl text-blue-100 font-bold">o</span>
					<span className="text-4xl text-blue-100 font-bold pt-4">{tempUnit}</span>
				</div>

				<div className="text-blue-200 font-bold text-left">
					<div>Humidity {main.humidity}%</div>
					<div>Wind speed {windConverter(wind.speed)} km/h</div>
					<div className="flex">{weather[0].description}</div>
				</div>
			</div>
			<HourlyWeather dayWeather={dayWeather.hourlyList} />
		</div>
	)
}