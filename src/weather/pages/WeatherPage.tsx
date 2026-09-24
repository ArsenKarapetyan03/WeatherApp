import { useContext, useState, useEffect } from "react";
import { CustomLoadingSpinner } from "custom-ui-components/src/components/CustomLoadingSpinner.tsx";
import { PageHeader } from "../components/PageHeader.tsx";
import { WeatherCard } from "../components/WeatherCard.tsx";
import { HourlyWeather } from "../components/HourlyWeather.tsx";
import { DailyWeather } from "../components/DailyWeather.tsx";
import { getWeather } from "../api/weatherApi.ts";
import { WeatherContext } from "../hooks/Provider.tsx";
import type { WeatherData } from "../model/weather.types.ts";

export const WeatherPage = () => {

	const {search} = useContext(WeatherContext);

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

	const todayWeather = weatherData?.list.filter(item => new Date(Number(item.dt) * 1000).getDate() === new Date().getDate());

	return (
		<div>
			<PageHeader />

			<main className="max-w-2/3 mx-auto mt-20">
				<div className="m-10 font-semibold text-white text-xl">
					<p className="text-xl">Weather dashboard</p>
					<h1 className="font-bold text-white">Weather in your city</h1>
					<p className="font-semibold">Search any city to see the current temperature and conditions.</p>
				</div>

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
									<HourlyWeather dayWeather={todayWeather}/>
									<DailyWeather weatherData={weatherData}/>
								</div>
							)
							: null}
			</main>
		</div>
	)
}