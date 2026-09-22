import { type ChangeEvent, type SubmitEvent, useContext, useState } from "react";
import { CustomButton } from "custom-ui-components/src/components/CustomButton.tsx";
import { cn } from "custom-ui-components/src/lib/utils.ts";
import { WeatherContext } from "../hooks/Provider.tsx";

export const WeatherSearch = () => {
	const {setSearch} = useContext(WeatherContext);
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
				"flex bg-blue-500 border border-blue-400 rounded-lg",
				"hover:border-blue-400 focus-within:border-blue-400 transition"
			)}
		>
			<input
				id="search"
				type="text"
				placeholder="Enter your city"
				value={input}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
				className="flex-1 p-1 text-white rounded-lg placeholder-blue-300 focus:outline-none"
			/>
			<CustomButton
				type="submit"
				className="text-white bg-transparent border-none shadow-none hover:text-blue-800"
			>
				Search
			</CustomButton>
		</form>
	)
}