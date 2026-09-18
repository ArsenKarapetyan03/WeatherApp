import type { WeatherData } from "../model/weather.types.ts";

const API_KEY = import.meta.env.VITE_API_KEY;
const CITY_URL = "https://api.openweathermap.org/geo/1.0/direct?q=";
const DAILY_URL = "https://api.openweathermap.org/data/2.5/forecast";

const getCity = async (city: string) => {
	const response = await fetch(CITY_URL + city + "&appid=" + API_KEY);
	const data = await response.json();
	const {name, lat, lon} = data[0];

	return {name, lat, lon};
}

export const getWeather = async (city: string): Promise<WeatherData> => {
	const {name, lat, lon} = await getCity(city);

	const response = await fetch(DAILY_URL + "?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + API_KEY);
  const data = await response.json();
	const {weather, main, wind, clouds, dt_txt} = data.list[1];

	return {name, weather, main, wind, clouds, dt_txt};
}