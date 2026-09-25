import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { WeatherContext } from "../hooks/Provider.tsx";
import { CustomButton, CustomNotification, EmptyState } from "custom-ui-components";
import { PageHeader } from "../components/PageHeader.tsx";
import { WeatherRow } from "../components/WeatherRow.tsx";

export const FavoriteCitiesPage = () => {
	const {cities} = useContext(WeatherContext);
	const navigate = useNavigate();
	const location = useLocation();
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);

	const hasPreviousPage = location.key !== "default";

	return (
		<div>
			<PageHeader />

			<main className="max-w-2/3 w-full mx-auto mt-20">
				<div className="flex justify-between items-center">
					<CustomButton
						disabled={!hasPreviousPage}
						onClick={()=>navigate(-1)}
						className="disabled:bg-black/5 disabled:text-blue-100"
					>
						<ArrowLeft/>
					</CustomButton>
					<h1 className="m-10 flex-1 font-semibold text-white">Favorite cities</h1>
				</div>
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
