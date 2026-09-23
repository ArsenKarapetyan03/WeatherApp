import { useContext, useState } from "react";
import { WeatherContext } from "../hooks/Provider.tsx";
import { PageHeader } from "../components/PageHeader.tsx";
import { WeatherRow } from "../components/WeatherRow.tsx";
import { CustomNotification } from "custom-ui-components/src/components/CustomNotification.tsx";
import { EmptyState } from "custom-ui-components/src/components/EmptyState.tsx";

export const FavoriteCities = () => {
	const {cities} = useContext(WeatherContext);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);

	return (
		<div>
			<PageHeader />

			<main className="max-w-2/3 w-full mx-auto mt-20">
				<h1 className="m-10 font-semibold text-white">Favorite cities</h1>
				<div>
					{cities && cities.length > 0 && (
						<div className="flex flex-col gap-1">
							{cities.map((city) => (
								<WeatherRow key={city} city={city} setIsNotificationOpen={setIsNotificationOpen} />
							))}
						</div>
					)}
				</div>
				{cities.length === 0 && (
					<EmptyState
						message="Your cities list is empty."
						className="text-white"
					/>
				)}
			</main>

			<CustomNotification
				message={
					{
						title: "Deleted",
						content: "City deleted from list 'Favorites'",
					}
				}
				open={isNotificationOpen}
				setOpen={setIsNotificationOpen}
			/>
		</div>
	);
};
