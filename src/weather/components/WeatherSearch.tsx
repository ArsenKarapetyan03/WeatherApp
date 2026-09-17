import { CustomButton } from "custom-ui-components/src/components/CustomButton.tsx";
import { cn } from "custom-ui-components/src/lib/utils.ts";

// interface WeatherSearchProps {
//
// }

export const WeatherSearch = () => {
	return (
		<div className={cn(
			"my-4 mx-auto max-w-1/2 flex",
			"bg-zinc-500/10 border border-white/50 rounded-lg",
			"hover:border-white focus-within:border-white transition"
		)}
		>
			<input
				type="text"
				placeholder="Enter your city"
				className="flex-1 p-1 text-white placeholder-gray-100 focus:outline-none"
			/>
			<CustomButton
				type="button"
			>
				Search
			</CustomButton>
		</div>
	)
}