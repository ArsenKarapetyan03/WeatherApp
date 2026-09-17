import type { WeatherData } from "../model/weather.types.ts";

const API_KEY = import.meta.env.VITE_API_KEY;
const CITY_URL = "https://api.openweathermap.org/geo/1.0/direct?q=";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const DAILY_URL = "https://api.openweathermap.org/data/2.5/forecast";

const getCity = async (city: string) => {
	const response = await fetch(CITY_URL + city + "&appid=" + API_KEY);
	const data = await response.json();
	const {lat, lon} = data[0];
	return {lat, lon};
}

export const getWeather = async (city: string): Promise<WeatherData> => {
	const {lat, lon} = await getCity(city);

	const response = await fetch(WEATHER_URL + "?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + API_KEY);
	const {name, weather, main, wind, clouds} = await response.json();

	return {name, weather, main, wind, clouds};
}

export const getDailyWeather = async (city: string) => {
	const {lat, lon} = await getCity(city);
	const response = await fetch(DAILY_URL + "?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + API_KEY);

	const data = await response.json();

	return data.list;
}