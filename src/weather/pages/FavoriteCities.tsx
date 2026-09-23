import { useContext } from "react";
import { WeatherContext } from "../hooks/Provider.tsx";
import { PageHeader } from "../components/PageHeader.tsx";
import { WeatherRow } from "../components/WeatherRow.tsx";

export const FavoriteCities = () => {
	const {cities} = useContext(WeatherContext);

	return (
		<div>
			<PageHeader />

			<main className="max-w-2/3 w-full mx-auto mt-20">
				<h1 className="m-10 font-semibold text-white">Favorite cities</h1>
				<div>
					{cities && cities.length > 0 && (
						<div className="flex flex-col gap-1">
							{cities.map((city) => (
								<WeatherRow key={city} city={city} />
							))}
						</div>
					)}
				</div>
			</main>
		</div>
	);
};
