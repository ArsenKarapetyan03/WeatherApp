import { useContext, useEffect, useState, type Dispatch, type SetStateAction, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { Droplets, Wind } from "lucide-react";
import { WeatherContext } from "@/hooks/WeatherContext.ts";
import { useUnitConverter } from "@/hooks/useUnitConverter.ts";
import { useWeatherActions } from "@/hooks/useWeatherActions.ts";
import { CustomButton, CustomModal, CustomLoadingSpinner } from "custom-ui-components";
import { windConverter } from "@/helpers/windConverter.ts";
import { getWeather } from "@/api/weatherApi.ts";
import { DeleteAlert } from "../general/DeleteAlert.tsx";
import type { WeatherData } from "@/model/weather.types.ts";
import { createIconUrl } from "@/helpers/createIconUrl.ts";

interface WeatherRowProps {
	city: string;
	setIsNotificationOpen: Dispatch<SetStateAction<boolean>>;
}

export const WeatherRow = (
	{
		city,
		setIsNotificationOpen,
	}: WeatherRowProps
) => {

	const navigate = useNavigate();
	const convert = useUnitConverter();
	const {setSearch, tempUnit} = useContext(WeatherContext);
	const {addCity} = useWeatherActions();
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const finalWeatherData = weatherData?.list[0];

	const navigateToWeatherPage = () => {
		setSearch(city);
		navigate("/");
	};

	const handleDeleteFavorite = () => {
		addCity(city);
		setIsNotificationOpen(true);
	}

	useEffect(() => {
		startTransition(async () => {
			setError(null);

			try {
				const data = await getWeather(city);
				setWeatherData(data);
			} catch (err) {
				console.error(err);
				setError("Can't get weather data");
			}
		});
	}, [city]);

	return (
		<div className="w-full py-2 px-4 flex items-center gap-10 text-blue-100 font-bold rounded bg-black/5 hover:bg-black/10 transition-colors duration-200">
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
						<div className="mr-10 text-4xl text-blue-100">
							<span>{convert(finalWeatherData.main.temp)}</span>
							<span className="text-2xl text-yellow-300 align-text-top">°{tempUnit}</span>
						</div>
						<img src={createIconUrl(finalWeatherData.weather[0].icon.replace("n", "d"))} alt=""/>
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