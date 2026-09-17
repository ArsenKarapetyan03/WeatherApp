import type { DailyWeatherData } from "../model/weather.types.ts";


export const DailyWeather = ({dailyWeatherData}: { dailyWeatherData: DailyWeatherData }) => {
	return (
		<div
			className="flex flex-col gap-2 my-20 p-3 mx-auto max-w-2/3 text-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.3)] rounded-lg">
			{/*{dailyWeatherData.list.map(item => {*/}
			{/*	return (*/}
			{/*		<div>{item.weather[0].description}</div>*/}
			{/*	)*/}
			{/*})}*/}

			{dailyWeatherData.list[5].dt_txt}
		</div>
	)
}