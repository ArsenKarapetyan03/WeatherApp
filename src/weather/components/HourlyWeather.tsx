import type { WeatherData } from "../model/weather.types.ts";

export const HourlyWeather = ({weatherData}: {weatherData: WeatherData}) => {

	const main = weatherData.list[0].main

	return (
		<div className="flex flex-col gap-2 my-20 p-3 mx-auto max-w-2/3 text-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.3)] rounded-lg">
			<div className="flex justify-evenly">
				{/* Temperature */}
				<div className="flex justify-center font-semibold text-blue-50">
					<div>Now {Math.round(main.temp)}</div>
				</div>

			</div>
		</div>
	)
}