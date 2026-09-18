import type { WeatherData } from "../model/weather.types.ts";


export const DailyWeatherPage = (
	{dailyWeatherData}:
	{
		dailyWeatherData: WeatherData,
	}) => {



	return (
		<div
			className="flex flex-col gap-2 p-3 text-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.3)] rounded-lg">
			{dailyWeatherData.list.map(item =>  {
				return (
					<div
						key={item.dt}
						className="text-blue-100 font-bold text-left"
					>
						{/*{new Date(Number(item.dt)*1000).getHours()}*/}
						{new Date(Number(item.dt)*1000).getDate()}
						{/*<div>Feels like {Math.round(main.feels_like)}°</div>*/}
						{/*<div>Humidity {main.humidity}%</div>*/}
						{/*<div>Wind speed {Math.round(wind.speed * 3.6)} km/h</div>*/}
						{/*<div>{weather[0].description}</div>*/}
					</div>
				)
			})}

			{dailyWeatherData.list.length}
		</div>
	)
}