import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { CustomLoadingSpinner } from "custom-ui-components/src/components/CustomLoadingSpinner.tsx";
import { ICON_URL } from "../model/weather.config.ts";
import { getWeather } from "../api/weatherApi.ts";
import type { WeatherData } from "../model/weather.types.ts";
import { Droplets, Wind } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FavoriteCitiesProps {
	cities: string[];
	setCities: Dispatch<SetStateAction<string[]>>;
	setSearch: Dispatch<SetStateAction<string | null>>;
}

interface CityWeatherProps {
	city: string;
	setCities: Dispatch<SetStateAction<string[]>>;
	setSearch: Dispatch<SetStateAction<string | null>>;
}

const CityWeatherRow = (
	{
		city,
		setSearch,
	}: CityWeatherProps) => {

	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();

	const navigateToHomepage = () => {
		setSearch(city)
		navigate("/");
	};

	useEffect(() => {
		const fetchWeather = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const data = await getWeather(city);
				setWeatherData(data);
			} catch (err) {
				console.error(err);
				setError("Can't get weather data");
			} finally {
				setIsLoading(false);
			}
		};

		fetchWeather();
	}, [city]);

	if (isLoading) {
		return (
			<div className="flex items-center gap-10">
				<CustomLoadingSpinner size="lg" variant="solid"/>
				<p className="text-white">Fetching data...</p>
			</div>
		);
	}

	if (error) {
		return (<p className="text-red-500 text-center bg-white p-3 rounded-lg border border-red-500">{error}</p>);
	}

	if (!weatherData) return null;

	const {weather, main, wind} = weatherData.list[0];

	return (
		<button
			onClick={() => {
				navigateToHomepage()
			}}
			className="w-full py-2 px-4 flex justify-between items-center text-blue-100 font-bold cursor-pointer rounded bg-black/5 hover:bg-black/10 transition-colors duration-200"
		>
			<div className="text-blue-100 text-2xl font-bold">{city}</div>
			<div className="flex gap-8 items-center text-2xl">
				<div className="mr-10 text-3xl text-yellow-200">{Math.round(main.temp)}°</div>
				<img src={`${ICON_URL}${weather[0].icon.replace("n", "d")}.png`} alt=""/>
				<div>
					<Droplets size={20} className="inline"/>
					<span> {main.humidity}</span>
					<span className="text-sm">%</span>
				</div>
				<div>
					<Wind className="inline"/>
					<span> {Math.round(wind.speed * 3.6)}</span>
					<span className="text-sm">km/h</span>
				</div>
			</div>
		</button>
	);
};

export const FavoriteCities = (
	{
		cities,
		setCities,
		setSearch
	}: FavoriteCitiesProps) => {


	return (
		<div>
			<h1 className="m-10 font-semibold text-white">Favorite cities</h1>
			<div className="max-w-2/3 w-full mx-auto">
				{cities && cities.length > 0 && (
					<div className="flex flex-col gap-1">
						{cities.map((city) => (
							<CityWeatherRow key={city} city={city} setSearch={setSearch} setCities={setCities}/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
