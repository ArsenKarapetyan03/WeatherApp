import { useContext } from "react";
import { useUnitConverter } from "@/hooks/useUnitConverter.ts";
import { Droplets, Wind } from "lucide-react";
import { WeatherContext } from "@/hooks/WeatherContext.ts";
import { windConverter } from "@/helpers/windConverter.ts";
import type { Weather } from "@/model/weather.types.ts";
import { createIconUrl } from "@/helpers/createIconUrl.ts";

export const HourlyWeather = ({dayWeather}: {dayWeather : Weather[] | undefined }) => {

	const {tempUnit} = useContext(WeatherContext);
	const convert = useUnitConverter();

	if (!dayWeather) {
		return (<p className="text-white">Hourly weather is unavailable</p>);
	}

	return (
		<div className="flex gap-2 text-xl overflow-x-auto">
			{dayWeather.map((item: any, index: number) => (
				<div
					key={index}
					className="flex-1 flex flex-col gap-2 p-2 max-w-1/3 font-semibold text-blue-50 bg-black/5 rounded-lg"
				>
					<div>{new Date(Number(item.dt) * 1000).getHours()}:00</div>
					<div className="flex justify-between gap-2">
						<div className="flex text-5xl">
							<span>{convert(item.main.temp)}</span>
							<span className="text-3xl text-yellow-300">°{tempUnit}</span>
						</div>
						<div className="flex flex-col items-end text-nowrap text-blue-300 font-bold">
							<img className="size-10" src={createIconUrl(item.weather[0].icon)} alt="" />
							<div>
								<Droplets size={18} className="inline"/>
								<span> {item.main.humidity}</span>
								<span className="text-sm">%</span>
							</div>
							<div className="flex gap-1 items-center">
								<Wind size={20} className="inline"/>
								<span>{windConverter(item.wind.speed)}</span>
								<span className="text-sm">km/h</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}