import { useEffect, useState } from "react";
import { WeatherCard } from "../components/WeatherCard.tsx";
import { WeatherSearch } from "../components/WeatherSearch.tsx";
import { getWeather } from "../api/weatherApi.ts";
import type { WeatherData } from "../model/weather.types.ts";
import { DailyWeatherPage } from "./DailyWeatherPage.tsx";
import { HourlyWeather } from "../components/HourlyWeather.tsx";
// import { DailyWeatherPage } from "./DailyWeatherPage.tsx";

export const WeatherPage = () => {

	const [search, setSearch] = useState("Yerevan");
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);


	useEffect(() => {
		const fetchWeather = async () => {
			const data = await getWeather(search);
			setWeatherData(data);
		}
		fetchWeather();
	},[search]);

	return (
		<main className="w-3/4 mx-auto">
			<div className="font-semibold text-white text-xl">
				<p className="mt-4 text-xl">Weather dashboard</p>
				<h1 className="text-bold text-white">Weather in your city</h1>
				<p className="font-semibold">Search any city to see the current temperature and conditions.</p>
			</div>

			<WeatherSearch setSearch={setSearch}/>
			{weatherData ?
				<div>
					<WeatherCard weatherData={weatherData} />

					{/*<DailyWeatherPage dailyWeatherData={weatherData} />*/}

					<HourlyWeather weatherData={weatherData} />
				</div>
				: null}
		</main>
	)
}