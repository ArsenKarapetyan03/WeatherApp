import { useContext, useMemo } from "react";
import { useUnitConverter } from "@/hooks/useUnitConverter.ts";
import { CalendarDays } from "lucide-react";
import { WeatherContext } from "@/hooks/WeatherContext.ts";
import { CollapsiblePanel } from "custom-ui-components";
import type { Weather, WeatherData } from "@/model/weather.types.ts";
import { DayWeatherRow } from "./DayWeatherRow.tsx";
import { DayWithHourlyWeather } from "./DayWithHourlyWeather.tsx";

interface DailyWeatherItem extends Weather {
	hourlyList: Weather[];
}

export const DailyWeather = ({weatherData}: {weatherData: WeatherData}) => {
	const {tempUnit} = useContext(WeatherContext);
	const convert = useUnitConverter();

	const panels = useMemo(() => {
		const dailyForecasts = getDailyMinMaxWeather(weatherData);

		return dailyForecasts.map(item => (
			{
				title: <DayWeatherRow dayWeather={item}/>,
				content: <DayWithHourlyWeather dayWeather={item}/>
			}
		))
	}, [weatherData, convert, tempUnit]);

	return (
		<div className="flex flex-col gap-2 p-3 text-2xl bg-black/10 shadow-[5px_5px_20px_rgba(0,0,0,0.25)] rounded-lg">
			<div className="font-bold text-3xl text-blue-200">
				<CalendarDays className="inline"/>
				<span> 5-day forecast</span>
			</div>

			<CollapsiblePanel
				panels={panels}
				containerStyles="border-none"
				titleStyles="w-full bg-transparent border-b border-gray-200"
				contentStyles="border-none"
				icon={false}
			/>
		</div>
	)
}

function getDailyMinMaxWeather(data: WeatherData): DailyWeatherItem[] {
	const today = new Date();
	const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

	const dailyGroups = data.list.reduce<Record<string, DailyWeatherItem>>((acc, item) => {
		const dateObj = new Date(Number(item.dt) * 1000);
		const dateKey = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;

		if (dateKey === todayKey) {
			return acc;
		}

		const {temp} = item.main;

		if (!acc[dateKey]) {
			acc[dateKey] = {
				...item,
				main: {...item.main, temp_min: temp, temp_max: temp},
				hourlyList: [item],
			};
		} else {
			const main = acc[dateKey].main;
			main.temp_min = Math.min(main.temp_min, temp);
			main.temp_max = Math.max(main.temp_max, temp);
			acc[dateKey].hourlyList.push(item);
		}

		return acc;
	}, {});

	return Object.values(dailyGroups);
}