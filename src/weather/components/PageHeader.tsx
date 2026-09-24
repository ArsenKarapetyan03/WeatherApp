import { useNavigate, useLocation } from "react-router-dom";
import { List } from "lucide-react";
import { CustomButton } from "custom-ui-components/src/components/CustomButton.tsx";
import { WeatherSearch } from "./WeatherSearch.tsx";
import { ToggleTempUnit } from "./ToggleTempUnit.tsx";

export const PageHeader = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const isHomePage = location.pathname === "/";
	const isFavoritesPage = location.pathname === "/FavoriteCitiesPage";

	const navigateToFavorites = () => {
		if (isFavoritesPage) {
			return;
		}
		navigate("/FavoriteCitiesPage");
	};

	const navigateToHome = () => {
		if (isHomePage) {
			return;
		}
		navigate("/");
	};

	return (
		<header className="w-full fixed top-0 z-50 p-2 flex justify-center items-center bg-blue-800 border border-blue-300">
			<div className="absolute left-10">
				{!isFavoritesPage ?
					<CustomButton
						variant="link"
						onClick={navigateToFavorites}
						className="bg-black/30 text-blue-100 font-semibold"
					>
						<List strokeWidth={3} className="inline mr-2"/>
						<span>Favorites</span>
					</CustomButton>
					:
					<CustomButton
						variant="link"
						onClick={navigateToHome}
						className="bg-black/30 text-blue-100 font-semibold"
					>
						Home
					</CustomButton>
				}
			</div>

			<div className="w-full max-w-2/3">
				<WeatherSearch/>
			</div>

			<div className="absolute right-10">
				<ToggleTempUnit />
			</div>
		</header>
	)
}