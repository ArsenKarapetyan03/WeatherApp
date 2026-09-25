import { DEFAULT_CITY, WEATHER_API } from "../model/weather.config.ts";
import { createApiUrl } from "../helpers/createApiUrl.ts";
import type { WeatherData } from "../model/weather.types.ts";

type Coordinates = {
	lat: number;
	lon: number;
};

const getCurrentCoords = (): Promise<{ lat: number, lon: number } | null> => {
	return new Promise((resolve) => {
		if (!navigator.geolocation) {
			console.warn("Geolocation is not supported by your browser");
			return resolve(null);
		}

		navigator.geolocation.getCurrentPosition(
			(position) => resolve({
				lat: position.coords.latitude,
				lon: position.coords.longitude
			}),
			(error) => {
				console.warn("Geolocation failed or denied:", error.message);
				resolve(null);
			}
		);
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

export const getWeather = async (city: string | null): Promise<WeatherData> => {
	try {
		let coordinates: Coordinates | null = null;

		if (!city) {
			try {
				const userCoords = await getCurrentCoords();

				if (userCoords) {
					coordinates = {
						lat: userCoords.lat,
						lon: userCoords.lon
					};
				}
			} catch (error) {
				console.warn("Could not get current coordinates", error);
			}
		}

		if (!coordinates) {
			const targetCity = city || DEFAULT_CITY;

			const cityData = await getCityCoords(targetCity);
			coordinates = {
				lat: cityData.lat,
				lon: cityData.lon
			};
		}


		const url = createApiUrl(WEATHER_API.FORECAST, {
			lat: coordinates.lat,
			lon: coordinates.lon,
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
			name: data.city?.name,
		};
	} catch (error) {
		console.error("Failed to fetch weather data:", error);
		throw error;
	}
};