import { createContext, type Dispatch, type SetStateAction } from "react";
import type { TempUnit } from "../model/weather.types.ts";

interface WeatherContextType {
	cities: string[];
	setCities: Dispatch<SetStateAction<string[]>>;
	search: string | null;
	setSearch: Dispatch<SetStateAction<string | null>>;
	tempUnit: TempUnit;
	setTempUnit: Dispatch<SetStateAction<TempUnit>>;
}

export const WeatherContext = createContext<WeatherContextType>({
	cities: [],
	setCities: (() => {}) as Dispatch<SetStateAction<string[]>>,
	search: null,
	setSearch: (() => {}) as Dispatch<SetStateAction<string | null>>,
	tempUnit: "C",
	setTempUnit: (() => {}) as Dispatch<SetStateAction<TempUnit>>,
});