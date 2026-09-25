import { useContext } from "react";
import { WeatherContext } from "./WeatherContext.ts";

export const useUnitConverter = () => {
	const {tempUnit} = useContext(WeatherContext);

	return (unit: number) => {
		return Math.round(tempUnit === "F" ? (unit * 9 / 5) + 32 : unit);
	};
}