import { useState, useEffect, type Dispatch, type SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Droplets, Wind, Trash2Icon } from "lucide-react";
import { useUnitConverter } from "../hooks/useUnitConverter.ts";
import { windConverter } from "../helpers/windConverter.ts";
import { CustomLoadingSpinner } from "custom-ui-components/src/components/CustomLoadingSpinner.tsx";
import { CustomButton } from "custom-ui-components/src/components/CustomButton.tsx";
import { CustomModal } from "custom-ui-components/src/components/CustomModal.tsx";
import { getWeather } from "../api/weatherApi.ts";
import { ICON_URL } from "../model/weather.config.ts";
import type { WeatherData } from "../model/weather.types.ts";
import { WeatherContext } from "../hooks/Provider.tsx";

const DeleteAlert = (
	{
		onClick,
		onClose,
	}: {
		onClick: () => void;
		onClose: Dispatch<SetStateAction<boolean>>;
	}) => {

	return (
		<div className="flex flex-col items-center gap-4">

			<div className="px-1 py-2 text-red-500 bg-red-100 rounded-lg">
				<Trash2Icon size={48} strokeWidth={2}/>
			</div>
			<p className="font-bold text-xl">Delete city?</p>
			<p>This will permanently delete this city weather information</p>
			<div className="flex justify-center gap-2">
				<CustomButton
					onClick={() => onClose(false)}
					className="transition duration-200"
				>
					Cancel
				</CustomButton>
				<CustomButton
					onClick={onClick}
					className="font-semibold text-red-500  bg-red-100 hover:bg-white hover:text-red-500 hover:border-red-300 transition duration-200"
				>
					Delete
				</CustomButton>
			</div>
		</div>
	)
}

const CityWeatherRow = ({city}: {city: string}) => {
	const {setSearch, setCities} = useContext(WeatherContext);
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	const navigateToWeatherPage = () => {
		setSearch(city)
		navigate("/");
	};

	const handleDeleteFavorite = () => {
		setCities(prevState => prevState.filter((name) => city !== name));
	}

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

	const convert = useUnitConverter();

	const finalWeatherData = weatherData?.list[0];

	return (
		<div
			className="w-full py-2 px-4 flex items-center gap-10 text-blue-100 font-bold rounded bg-black/5 hover:bg-black/10 transition-colors duration-200">
			<div
				onClick={navigateToWeatherPage}
				className="w-full flex gap-8 items-center text-2xl cursor-pointer"
			>
				<div className="flex-1 text-left text-blue-100 text-2xl font-bold">{city}</div>

				{isLoading ? (
					<div className="flex items-center p-1 gap-10 rounded-lg">
						<CustomLoadingSpinner
							variant="solid"
							colorClass="text-white"
						/>
						<p className="text-base text-white">Loading...</p>
					</div>
				) : error ? (
					<p className="text-red-500 text-center bg-white p-3 rounded-lg border border-red-500">{error}</p>
				) : finalWeatherData ? (
					<>
						<div className="mr-10 text-3xl text-yellow-200">
							{convert(finalWeatherData.main.temp)}°
						</div>
						<img src={`${ICON_URL}${finalWeatherData.weather[0].icon.replace("n", "d")}.png`} alt=""/>
						<div>
							<Droplets size={20} className="inline"/>
							<span> {finalWeatherData.main.humidity}</span>
							<span className="text-sm">%</span>
						</div>
						<div>
							<Wind className="inline"/>
							<span> {windConverter(finalWeatherData.wind.speed)}</span>
							<span className="text-sm">km/h</span>
						</div>
					</>
				) : null}
			</div>
			<CustomButton
				type="button"
				onClick={() => setIsModalOpen(true)}
				variant="primary"
				className="bg-black/10"
			>
				Delete
			</CustomButton>
			<CustomModal
				modalOpen={isModalOpen}
				setModalOpen={setIsModalOpen}
				content={{
					contentTitle: "",
					contentBody: <DeleteAlert onClick={handleDeleteFavorite} onClose={setIsModalOpen} />
				}}
			/>
		</div>
	);
};

export const FavoriteCities = () => {
	const {cities} = useContext(WeatherContext);

	return (
		<div>
			<h1 className="m-10 font-semibold text-white">Favorite cities</h1>
			<div className="max-w-2/3 w-full mx-auto">
				{cities && cities.length > 0 && (
					<div className="flex flex-col gap-1">
						{cities.map((city) => (
							<CityWeatherRow key={city} city={city} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};
