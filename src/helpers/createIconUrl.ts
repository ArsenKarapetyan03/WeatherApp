import { ICON_URL } from "@/model/weather.config.ts";

export const createIconUrl = (icon:string) => {
	return `${ICON_URL}${icon}.png`
}