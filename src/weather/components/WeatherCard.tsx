import { useContext } from "react";
import { Star } from "lucide-react";
import { ICON_URL } from "../model/weather.config.ts";
import type { WeatherData } from "../model/weather.types.ts";
import { WeatherContext } from "../hooks/Provider.tsx";

export const WeatherCard = ({weatherData}: {weatherData: WeatherData}) => {

	const {cities, setCities, tempUnit} = useContext(WeatherContext);

	const name = weatherData.name;
	const {weather, main, wind} = weatherData.list[0];

	const isFavorite = cities.includes(name);

	const handleToggleFavorite = () => {
		setCities(prevState => {
			if (prevState.includes(name)) {
				return prevState.filter((city) => city !== name);
			} else {
				return [...prevState, name]
			}
		});
	}

	return (
		<div className="flex flex-col gap-2 py-3 text-2xl bg-black/5 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] rounded-lg">
			{/* Heading */}
			<div className="flex justify-center">
				<div className="flex-1 text-5xl text-blue-50 font-bold">{name}</div>
				<Star
					type="button"
					size={28}
					onClick={handleToggleFavorite}
					className={`m-3 text-white cursor-pointer drop-shadow-[5px_5px_5px_rgba(0,0,0,0.7)] hover:fill-white ${isFavorite && "fill-yellow-300 text-yellow-300 hover:fill-yellow-300"}`}/>
			</div>
			<div className="flex justify-evenly">
				{/* Temperature */}
				<div className="flex justify-center">
					<div className="text-9xl text-white font-bold">{Math.round(tempUnit === "F" ? (main.temp * 9 / 5) + 32 : main.temp)}</div>
					<span className="text-3xl text-blue-100 font-bold">o</span>
					<span className="text-5xl text-blue-100 font-bold pt-4">{tempUnit}</span>
				</div>
				{/* Weather info */}
				<div className="text-blue-200 font-bold text-left">
					<div>Feels like {Math.round(tempUnit === "F" ? (main.feels_like * 9 / 5) + 32 : main.feels_like)}°</div>
					<div>Humidity {main.humidity}%</div>
					<div>Wind speed {Math.round(wind.speed*3.6)} km/h</div>
					<div className="flex">{weather[0].description}
						<img src={ICON_URL + weather[0].icon + ".png"} alt=""/>
					</div>
				</div>
			</div>
		</div>
	)
}