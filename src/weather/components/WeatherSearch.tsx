import { type ChangeEvent, useContext, useRef, useState } from "react";
import { WeatherContext } from "../hooks/Provider.tsx";
import { X } from "lucide-react";

export const WeatherSearch = () => {
	const {setSearch} = useContext(WeatherContext);
	const [searchQuery, setSearchQuery] = useState("");
	const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleSearch = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {

		const value = e.target.value;
		setSearchQuery(value);
		const trimmedQuery = value.trim();

		if (timeOutRef.current) {
			clearTimeout(timeOutRef.current);
		}

		if (trimmedQuery) {
			timeOutRef.current = setTimeout(()=>{
				setSearch(trimmedQuery);
			},500);
		}
	}

	const handleReset = () => {
		setSearchQuery("");

		if (timeOutRef.current) {
			clearTimeout(timeOutRef.current);
		}
	};

	return (
		<div
			className={
				"flex items-center gap-2 w-full max-w-md bg-white/90 border border-slate-200 p-2 rounded-2xl shadow-xl transition-all duration-300" +
				" focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-white/20 focus-within:bg-white"
			}
		>
			<input
				name="search"
				type="text"
				placeholder="Enter city"
				value={searchQuery}
				onChange={handleSearch}
				className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 font-medium focus:outline-none"
			/>

			<button
				type="button"
				onClick={handleReset}
				className="text-blue-500 cursor-pointer hover:text-black"
			>
				<X />
			</button>
		</div>
	)
}