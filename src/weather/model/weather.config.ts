export const DEFAULT_CITY = "London";
export const API_KEY = import.meta.env.VITE_API_KEY;

export const ICON_URL = "https://openweathermap.org/img/wn/";
const BASE_URL = "https://api.openweathermap.org";

export const WEATHER_API = {
	GEO_DIRECT: `${BASE_URL}/geo/1.0/direct`,
	GEO_REVERSE: `${BASE_URL}/geo/1.0/reverse`,
	FORECAST: `${BASE_URL}/data/2.5/forecast`,
};