import { createContext, type Dispatch, type SetStateAction } from "react";

interface WeatherContextType {
	cities: string[];
	setCities: Dispatch<SetStateAction<string[]>>;
	search: string | null;
	setSearch: Dispatch<SetStateAction<string | null>>;
	tempUnit: string;
	setTempUnit: Dispatch<SetStateAction<string>>;
}

export const WeatherContext = createContext<WeatherContextType>({
	cities: [],
	setCities: (() => {}) as Dispatch<SetStateAction<string[]>>,
	search: null,
	setSearch: (() => {}) as Dispatch<SetStateAction<string | null>>,
	tempUnit: "C",
	setTempUnit: (() => {}) as Dispatch<SetStateAction<string>>,
});