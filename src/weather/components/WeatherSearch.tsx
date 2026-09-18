import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { CustomButton } from "custom-ui-components/src/components/CustomButton.tsx";
import { cn } from "custom-ui-components/src/lib/utils.ts";

interface WeatherSearchProps {
	setSearch: (search: string) => void;
}

export const WeatherSearch = ({setSearch}: WeatherSearchProps) => {
	const [input, setInput] = useState("");

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (input.trim()) {
			setSearch(input.trim());
			setInput("");
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={cn(
				"my-4 mx-auto max-w-1/2 flex bg-zinc-500/10 border border-white/50 rounded-lg",
				"hover:border-white focus-within:border-white transition"
			)}
		>
			<input
				type="text"
				placeholder="Enter your city"
				value={input}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
				className="flex-1 p-1 text-white placeholder-gray-100 focus:outline-none"
			/>
			<CustomButton type="submit">Search</CustomButton>
		</form>
	)
}