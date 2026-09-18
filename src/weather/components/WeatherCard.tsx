import type { WeatherData } from "../model/weather.types.ts";

export const WeatherCard = ({weatherData}: {weatherData: WeatherData}) => {

	const {weather, main, wind} = weatherData.list[0];
	const name = weatherData.name;

	return (
		<div className="flex flex-col gap-2 py-3 text-2xl bg-black/5 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] rounded-lg">
			{/* Heading */}
			<div className="text-5xl text-blue-50 font-bold">{name}</div>
			<div className="flex justify-evenly">
				{/* Temperature */}
				<div className="flex justify-center">
					<div className="text-9xl text-white font-bold">{Math.round(main.temp)}</div>
					<span className="text-3xl text-blue-100 font-bold">o</span>
					<span className="text-5xl text-blue-100 font-bold pt-4">C</span>
				</div>
				{/* Weather info */}
				<div className="text-blue-100 font-bold text-left">
					<div>Feels like {Math.round(main.feels_like)}°</div>
					<div>Humidity {main.humidity}%</div>
					<div>Wind speed {Math.round(wind.speed*3.6)} km/h</div>
					<div>{weather[0].description}</div>
				</div>
			</div>
		</div>
	)
}