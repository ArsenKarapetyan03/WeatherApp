import { useContext } from "react";
import { WeatherContext } from "../hooks/Provider.tsx";

export const unitConverter = (unit: number) => {
	const {tempUnit} = useContext(WeatherContext);

	return Math.round(tempUnit === "F" ? (unit * 9 / 5) + 32 : unit);
}