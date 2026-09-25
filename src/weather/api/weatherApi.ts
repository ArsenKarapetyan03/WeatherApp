import { DEFAULT_CITY, WEATHER_API } from "../model/weather.config.ts";
import { createApiUrl } from "../helpers/createApiUrl.ts";
import type { WeatherData } from "../model/weather.types.ts";

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
		const url = createApiUrl(WEATHER_API.GEO_DIRECT, {q: city});
		const response = await fetch(url);

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
		const url = createApiUrl(WEATHER_API.GEO_REVERSE, {lat, lon});
		const response = await fetch(url);

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
		let location: {
			name: string,
			lat: number,
			lon: number
		} | undefined;

		let targetCity = city || DEFAULT_CITY;

		if (!city) {
			const coords = await getCurrentCoords();

			if (coords) {
				let name = "Your location";

				try {
					name = await getCityName(coords.lat, coords.lon);
				} catch {
					console.warn("Failed to get City");
				}

				location = {
					name,
					lat: coords.lat,
					lon: coords.lon,
				};
			}
		}

		if (!location) {
			location = await getCityCoords(targetCity);
		}

		const url = createApiUrl(WEATHER_API.FORECAST, {
			lat: location.lat,
			lon: location.lon,
			units: "metric"
		});

		const response = await fetch(url);

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