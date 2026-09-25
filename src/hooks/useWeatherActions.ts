import { useContext } from "react";
import { WeatherContext } from "./WeatherContext.ts";

export const useWeatherActions = () => {
	const {setCities} = useContext(WeatherContext);


	const removeCity = (name: string) =>
		setCities((prevState) => prevState.filter((city) => city !== name));

	const addCity = (name: string) =>
		setCities((prevState) => [...prevState, name]);

	return { removeCity, addCity };
};