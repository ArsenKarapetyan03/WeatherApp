import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "lucide-react";
import { CustomLoadingSpinner } from "custom-ui-components/src/components/CustomLoadingSpinner.tsx";
import { CustomButton } from "custom-ui-components/src/components/CustomButton.tsx";
import { WeatherCard } from "../components/WeatherCard.tsx";
import { WeatherSearch } from "../components/WeatherSearch.tsx";
import { HourlyWeather } from "../components/HourlyWeather.tsx";
import { DailyWeather } from "../components/DailyWeather.tsx";
import { getWeather} from "../api/weatherApi.ts";
import type { WeatherData } from "../model/weather.types.ts";

export const WeatherPage = () => {

	const [search, setSearch] = useState<string | null>(null);
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();

	const navigateToFavorites = () => {
		navigate("/favoriteCities");
	};

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
		<div>
			<header className="w-full fixed top-0 z-50 p-2 flex justify-center items-center bg-blue-800 border border-blue-300">
				<div className="w-full max-w-2/3">
					<WeatherSearch setSearch={setSearch}/>
				</div>

				<div className="absolute right-10">
					<CustomButton
						variant="link"
						onClick={navigateToFavorites}
						className="bg-black/30 text-blue-100 font-semibold"
					>
						<span>Favorites</span>
						<List strokeWidth={3} className="inline ml-2 text-blue-300" />
					</CustomButton>
				</div>
			</header>


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
								<HourlyWeather weatherData={weatherData}/>
								<DailyWeather dailyWeatherData={weatherData}/>
							</div>
						)
							: null}
			</main>
		</div>
	)
}