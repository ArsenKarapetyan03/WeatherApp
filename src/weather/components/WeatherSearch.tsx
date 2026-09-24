import { type ChangeEvent, type SubmitEvent, useContext, useState } from "react";
import { WeatherContext } from "../hooks/Provider.tsx";
import { X } from "lucide-react";

export const WeatherSearch = () => {
	const {setSearch} = useContext(WeatherContext);
	const [searchQuery, setSearchQuery] = useState("");

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const trimmedQuery = searchQuery.trim();

		if (trimmedQuery) {
			setSearch(searchQuery);
			setSearchQuery("");
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={"p-2 flex bg-white border border-blue-400 rounded-lg"}
		>
			<input
				name="search"
				type="text"
				placeholder="Enter your city"
				value={searchQuery}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
				className="flex-1 p-1 rounded-lg placeholder-zinc-600 focus:outline-none"
			/>

			<button
				type="reset"
				onClick={() => setSearchQuery("")}
				className="text-blue-500 cursor-pointer hover:text-black"
			>
				<X />
			</button>
		</form>
	)
}