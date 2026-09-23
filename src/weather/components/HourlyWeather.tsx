import { useContext } from "react";
import { Droplets, Wind } from "lucide-react";
import { WeatherContext } from "../hooks/Provider.tsx";
import { useUnitConverter } from "../hooks/useUnitConverter.ts";
import type { WeatherData } from "../model/weather.types.ts";
import { ICON_URL } from "../model/weather.config.ts";
import { windConverter } from "../helpers/windConverter.ts";

export const HourlyWeather = ({weatherData}: { weatherData: WeatherData }) => {

	const {tempUnit} = useContext(WeatherContext);

	const convert = useUnitConverter();

	const todayWeather = weatherData.list.filter(item => new Date(Number(item.dt) * 1000).getDate() === new Date().getDate())

	return (
		<div
			className="flex gap-2 text-xl bg-black/5 rounded-lg overflow-x-auto shadow-[1px_5px_20px_rgba(0,0,0,0.25)]">
			{todayWeather.map((item: any, index: number) => {

				return (
					<div
						key={index}
						className="flex-1 flex flex-col gap-2 p-2 max-w-1/3 font-semibold text-blue-50 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
					>
						<div>{new Date(Number(item.dt) * 1000).getHours()}:00</div>
						<div className="flex justify-between gap-2">
							<div className="flex text-5xl">
								<span>{convert(item.main.temp)}</span>
								<span className="text-3xl text-yellow-300">°{tempUnit}</span>
							</div>
							<div className="flex flex-col items-end text-nowrap text-blue-300 font-bold">
								<img className="size-10" src={ICON_URL + item.weather[0].icon + ".png"}/>
								<div>
									<Droplets size={18} className="inline"/>
									<span> {item.main.humidity}</span>
									<span className="text-sm">%</span>
								</div>
								<div>
									<Wind size={20} className="inline"/>
									<span> {windConverter(item.wind.speed)}</span>
									<span className="text-sm">km/h</span>
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}