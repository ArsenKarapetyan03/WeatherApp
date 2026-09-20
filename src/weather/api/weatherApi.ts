import type { WeatherData } from "../model/weather.types.ts";

const API_KEY = import.meta.env.VITE_API_KEY;
const CITY_COORDS_URL = "https://api.openweathermap.org/geo/1.0/direct?q=";
const CITY_NAME_URL = "https://api.openweathermap.org/geo/1.0/reverse";
const DAILY_URL = "https://api.openweathermap.org/data/2.5/forecast";

const defaultCity = "London";

const getCurrentCoords = (): Promise<{ lat: number, lon: number } | null> => {
	return new Promise((resolve) => {
		if (!navigator.geolocation) {
			console.warn("Geolocation is not supported by your browser");
			return resolve(null);
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					lat: position.coords.latitude,
					lon: position.coords.longitude
				});
			}, (error) => {
				console.warn("Geolocation failed or denied:", error.message);
				resolve(null);
			});
	});
};

const getCityCoords = async (city: string): Promise<{ name: string, lat: number, lon: number }> => {
	try {
		const response = await fetch(CITY_COORDS_URL + city + "&appid=" + API_KEY);
		if (!response.ok) {
			throw new Error(`Network error: ${response.status}`);
		}

		const data = await response.json();
		if (!data.length) {
			throw new Error("City not found");
		}

		const {name, lat, lon} = data[0];

		return {name, lat, lon};
	} catch (error) {
		console.error("Failed to fetch city data:", error);
		throw error;
	}
};

const getCityName = async (lat: number, lon: number) => {
	try {
		const response = await fetch(CITY_NAME_URL + "?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY);
		if (!response.ok) {
			throw new Error(`Network error: ${response.status}`);
		}
		const data = await response.json();
		if (!data.length) {
			throw new Error("City not found");
		}

		return data[0].name;
	} catch (error) {
		console.error("Failed to fetch city name:", error);
		throw error;
	}
};

export const getWeather = async (city: string | null): Promise<WeatherData> => {
	try {
		let location

		if (city) {
			location = await getCityCoords(city);
		} else {
			const coords = await getCurrentCoords();

			if (coords) {
				try {
					location = {
						name: await getCityName(coords.lat, coords.lon),
						lat: coords.lat,
						lon: coords.lon,
					};
				} catch {
					location = {
						name: "Your location",
						lat: coords.lat,
						lon: coords.lon,
					};
				}
			}
			else {
				location = await getCityCoords(defaultCity);
			}
		}

		const response = await fetch(DAILY_URL + "?lat=" + location.lat + "&lon=" + location.lon + "&units=metric&appid=" + API_KEY);

		if (!response.ok) {
			throw new Error(`Network error: ${response.status}`);
		}

		const data = await response.json();

		if (!data?.list?.length) {
			throw new Error("Weather info not found");
		}

		return {
			list: data.list,
			name: location.name,
		};
	} catch (error) {
		console.error("Failed to fetch weather data:", error);
		throw error;
	}
};