import { useContext, useState } from "react";
import { Star } from "lucide-react";
import { WeatherContext } from "@/hooks/WeatherContext.ts";
import { useUnitConverter } from "@/hooks/useUnitConverter.ts";
import { useWeatherActions } from "@/hooks/useWeatherActions.ts";
import { windConverter } from "@/helpers/windConverter.ts";
import { CustomNotification, cn } from "custom-ui-components";
import { createIconUrl } from "@/helpers/createIconUrl.ts";
import type { WeatherData } from "@/model/weather.types.ts";

interface NotificationState {
	type: "success" | "info" | undefined;
	message: {
		title: string;
		content: string;
	};
}

export const WeatherCard = ({weatherData}: {weatherData: WeatherData}) => {

	const {cities, tempUnit} = useContext(WeatherContext);
	const convert = useUnitConverter();
	const weatherActions = useWeatherActions();
	const [openNotification, setOpenNotification] = useState<boolean>(false);
	const [notification, setNotification] = useState<NotificationState>({
		type: undefined,
		message: { title: "", content: "" },
	});

	const name = weatherData.name;
	const {weather, main, wind} = weatherData.list[0];
	const isFavorite = cities.includes(name);

	const triggerToast = (action: "add" | "remove") => {
		const isAdded = action === "add";

		setNotification({
			type: isAdded ? "success" : "info",
			message: isAdded
				? { title: "Added successfully", content: "Now you can see your favorite city weather in Favorites" }
				: { title: "Removed", content: "Removed from list Favorites" }
		});

		setOpenNotification(false);
		setTimeout(() => {
			setOpenNotification(true);
		}, 100);
	};

	const handleToggleFavorite = () => {
		if (isFavorite) {
			weatherActions.removeCity(name);
			triggerToast("remove");
		} else {
			weatherActions.addCity(name);
			triggerToast("add");
		}
	};

	return (
		<div className="flex flex-col gap-2 text-2xl bg-black/5 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] rounded-lg">
			{/* Heading */}
			<div className="flex justify-center">
				<div className="flex-1 text-5xl text-blue-50 font-bold">{name}</div>
				<Star
					type="button"
					size={28}
					onClick={handleToggleFavorite}
					className={cn(
						"m-3 text-white cursor-pointer drop-shadow-[5px_5px_5px_rgba(0,0,0,0.7)] hover:fill-white",
						isFavorite && "fill-yellow-300 text-yellow-300 hover:fill-yellow-300"
					)}
				/>
			</div>
			<div className="flex justify-evenly">
				{/* Temperature */}
				<div className="flex justify-center">
					<div className="text-9xl text-white font-bold">{convert(main.temp)}</div>
					<span className="text-3xl text-blue-100 font-bold">o</span>
					<span className="text-5xl text-blue-100 font-bold pt-4">{tempUnit}</span>
				</div>
				{/* Weather info */}
				<div className="text-blue-200 font-bold text-left">
					<div>Feels like {convert(main.feels_like)}°</div>
					<div>Humidity {main.humidity}%</div>
					<div>Wind speed {windConverter(wind.speed)} km/h</div>
					<div className="flex">{weather[0].description}
						<img src={createIconUrl(weather[0].icon)} alt=""/>
					</div>
				</div>
			</div>

			<CustomNotification
				type={notification.type}
				message={notification.message}
				open={openNotification}
				setOpen={setOpenNotification}
			/>
		</div>
	)
}