import { useEffect, useState } from "react";
import { WeatherCard } from "../components/WeatherCard.tsx";
import { WeatherSearch } from "../components/WeatherSearch.tsx";
import { HourlyWeather } from "../components/HourlyWeather.tsx";
import { DailyWeather } from "../components/DailyWeather.tsx";
import { getWeather} from "../api/weatherApi.ts";
import { CustomLoadingSpinner } from "custom-ui-components/src/components/CustomLoadingSpinner.tsx";
import type { WeatherData } from "../model/weather.types.ts";

export const WeatherPage = () => {

	const [search, setSearch] = useState<string | null>(null);
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchWeather = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const data = await getWeather(search);
				setWeatherData(data);
			} catch (err) {
				console.log(err);
				setError("Can't get weather data");
			} finally {
				setIsLoading(false);
			}
		};
		fetchWeather();
	}, [search]);

	return (
		<main className="w-1/2 mx-auto">
			<div className="font-semibold text-white text-xl">
				<p className="mt-4 text-xl">Weather dashboard</p>
				<h1 className="font-bold text-white">Weather in your city</h1>
				<p className="font-semibold">Search any city to see the current temperature and conditions.</p>
			</div>

			<WeatherSearch setSearch={setSearch}/>

			{isLoading ? (
					<div className="m-40">
						<CustomLoadingSpinner size="lg" variant="solid"/>
						<p className="m-5 text-white">Fetching data...</p>
					</div>
				)
				: error ? (
						<p className="text-red-500 text-center mt-5 bg-white p-3 rounded-lg border border-red-500">
							{error}
						</p>
					)
					: weatherData ? (
						<div className="flex flex-col gap-5">
							<WeatherCard weatherData={weatherData}/>
							<HourlyWeather weatherData={weatherData}/>
							<DailyWeather dailyWeatherData={weatherData}/>
						</div>
					) : null}
		</main>
	)
}