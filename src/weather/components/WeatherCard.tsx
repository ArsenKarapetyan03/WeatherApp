import { useContext, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "custom-ui-components/src/lib/utils.ts";
import { ICON_URL } from "../model/weather.config.ts";
import { WeatherContext } from "../hooks/Provider.tsx";
import { useUnitConverter } from "../hooks/useUnitConverter.ts";
import { windConverter } from "../helpers/windConverter.ts";
import type { WeatherData } from "../model/weather.types.ts";
import { CustomNotification } from "custom-ui-components/src/components/CustomNotification.tsx";

interface NotificationState {
	type: "success" | "info" | undefined;
	message: {
		title: string;
		content: string;
	};
}

export const WeatherCard = ({weatherData}: {weatherData: WeatherData}) => {

	const {cities, setCities, tempUnit} = useContext(WeatherContext);
	const convert = useUnitConverter();
	const [openNotification, setOpenNotification] = useState<boolean>(false);

	const [notification, setNotification] = useState<NotificationState>({
		type: undefined,
		message: { title: "", content: "" },
	});

	const name = weatherData.name;
	const isFavorite = cities.includes(name);
	const {weather, main, wind} = weatherData.list[0];

	const triggerToast = (purpose: "add" | "removed") => {
		const isAdd = purpose === "add";

		setNotification({
			type: isAdd ? "success" : "info",
			message: isAdd
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
			setCities((prevState) => prevState.filter((city) => city !== name));
			triggerToast("removed");
		} else {
			setCities((prevState) => [...prevState, name]);
			triggerToast("add");
		}
	};

	return (
		<div className="flex flex-col gap-2 py-3 text-2xl bg-black/5 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] rounded-lg">
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
						<img src={ICON_URL + weather[0].icon + ".png"} alt=""/>
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