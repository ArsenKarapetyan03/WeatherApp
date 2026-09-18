import type { WeatherData } from "../model/weather.types.ts";


export const DailyWeatherPage = ({dailyWeatherData}: {dailyWeatherData: WeatherData}) => {



	return (
		<div
			className="flex flex-col gap-2 p-3 text-2xl bg-black/5 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] rounded-lg">
			{dailyWeatherData.list.map(item =>  {
				return (
					<div
						key={item.dt}
						className="text-blue-100 font-bold text-left"
					>
						{/*{new Date(Number(item.dt)*1000).getDate()}*/}
					</div>
				)
			})}

			{dailyWeatherData.list.length}
		</div>
	)
}