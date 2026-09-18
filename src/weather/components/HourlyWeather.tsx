import { Droplets, Wind } from "lucide-react";
import type { WeatherData } from "../model/weather.types.ts";

export const HourlyWeather = ({weatherData}: {weatherData: WeatherData}) => {

	const todayWeather = weatherData.list.filter(item =>	new Date(Number(item.dt)*1000).getDate() === new Date().getDate())

	return (
		<div
			className="flex gap-2 justify-between my-1 text-xl">
			{todayWeather.map((item: any, index: number) => {

				return (
					<div
						key={index}
						className="flex-1 flex flex-col gap-2 p-2 font-semibold text-blue-50 shadow-[1px_5px_15px_rgba(0,0,0,0.3)] rounded-lg"
					>
						<div>At {new Date(Number(item.dt)*1000).getHours() === new Date().getHours() ? "Now" : `${new Date(Number(item.dt)*1000).getHours()}:00`}</div>
						<div className="flex justify-between">
							<div className="relative text-5xl">{Math.round(item.main.temp)}<span className="absolute -top-2  text-yellow-300">°c</span></div>
							<div className="flex flex-col text-nowrap text-blue-600 font-bold">
								<div><Droplets size={20} className="inline"/> {item.main.humidity}%</div>
								<div><Wind className="inline"/> {Math.round(item.wind.speed*3.6)} km/h</div>
							</div>
						</div>
					</div>
				)
			})}

		</div>
	)
}