import { useNavigate, useLocation } from "react-router-dom";
import { List } from "lucide-react";
import { CustomButton } from "custom-ui-components";
import { ToggleTempUnit } from "../ToggleTempUnit.tsx";

export const PageHeader = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const isHomePage = location.pathname === "/";
	const isFavoritesPage = location.pathname === "/favorite-cities-page";

	const navigateToHome = () => navigate("/");
	const navigateToFavorites = () => navigate("/favorite-cities-page");

	return (
		<header className="w-full fixed top-0 z-50 py-2 bg-blue-800 shadow-2xl">
			<div className="max-w-2/3 mx-auto flex justify-between">
				<div className="flex gap-5">
					<CustomButton
						disabled={isHomePage}
						variant="link"
						onClick={navigateToHome}
						className="bg-black/30 text-blue-100 font-semibold disabled:bg-black/10 disabled:cursor-default disabled:active:text-blue-300"
					>
						Home
					</CustomButton>

					<CustomButton
						disabled={isFavoritesPage}
						variant="link"
						onClick={navigateToFavorites}
						className="bg-black/30 text-blue-100 font-semibold disabled:bg-black/10 disabled:cursor-default disabled:active:text-blue-300"
					>
						<List strokeWidth={3} className="inline mr-2"/>
						<span>Favorites</span>
					</CustomButton>
				</div>

				<ToggleTempUnit />
			</div>
		</header>
	)
}