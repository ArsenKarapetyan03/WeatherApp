import { useContext } from "react";
import { WeatherContext } from "../hooks/Provider.tsx";
import { cn } from "custom-ui-components/src/lib/utils.ts";

export const ToggleTempUnit = () => {

	const {tempUnit, setTempUnit} = useContext(WeatherContext);

	const handleClick = () => {
		setTempUnit(prevState => prevState === "C" ? "F" : "C")
	}

	return (
		<div>
			<div className="relative flex text-blue-100 font-semibold bg-black/30 rounded-lg">
				<button
					onClick={handleClick}
					className="p-2 rounded-lg cursor-pointer hover:text-blue-300 transition"
				>
					°C
				</button>
				<button
					onClick={handleClick}
					className="p-2 rounded-lg cursor-pointer hover:text-blue-300 transition"
				>
					°F
				</button>
				<div className={cn(
					"absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/20 rounded-lg transition-all duration-300 ease-in-out",
					tempUnit === "C" ? "left-1" : "left-[calc(50%)]"
					)} />
			</div>
		</div>
	)
}