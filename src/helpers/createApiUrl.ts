import { API_KEY } from "@/model/weather.config.ts";

export const createApiUrl = (endpoint: string, extraParams: Record<string, string | number>) => {
	const params = new URLSearchParams({
		appid: API_KEY,
		...extraParams,
	});

	return `${endpoint}?${params}`;
};