import { useEffect, useState } from "react";
import { getDailyWeather, getWeather } from "../api/weatherApi.ts";
import { WeatherCard } from "../components/WeatherCard.tsx";
import { WeatherSearch } from "../components/WeatherSearch";
import type { DailyWeatherData, WeatherData } from "../model/weather.types.ts";
import { DailyWeather } from "../components/DailyWeather.tsx";

export const WeatherPage = () => {

	const [search, setSearch] = useState("Yerevan");
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [dailyWeatherData, setDailyWeatherData] = useState<DailyWeatherData | null>(null);


	useEffect(() => {
		const fetchWeather = async () => {
			const data = await getWeather(search);
			setWeatherData(data);
		}
		fetchWeather();

		const fetchDailyWeather = async () => {
			const data = await getDailyWeather(search);
			setDailyWeatherData(data);
		}
		fetchDailyWeather();
	}, []);

	return (
		<main className="w-3/4 mx-auto">
			<div className="font-semibold text-white text-xl">
				<p className="mt-4 text-xl">Weather dashboard</p>
				<h1 className="text-bold text-white">Weather in your city</h1>
				<p className="font-semibold">Search any city to see the current temperature and conditions.</p>
			</div>

			<WeatherSearch />
			{weatherData ? <WeatherCard weatherData={weatherData}/> : null}
			{dailyWeatherData ? <DailyWeather dailyWeatherData={dailyWeatherData} /> : null}
		</main>
	)
}


// {
// 	city: "London",
// 	country: "UK",
// 	temperature: 20,
// 	feelsLike: 20,
// 	clouds: 0,
// 	description: "lorem",
// 	icon: "asdasd",
// 	humidity: 30,
// 	windSpeed: 22
// }