import { useContext } from "react";
import { ArrowLeft, List } from "lucide-react";
import { CustomButton } from "custom-ui-components/src/components/CustomButton.tsx";
import { WeatherContext } from "../hooks/Provider.tsx";
import { WeatherSearch } from "./WeatherSearch.tsx";
import { useNavigate, useLocation } from "react-router-dom";

export const PageHeader = () => {
	const {tempUnit, setTempUnit} = useContext(WeatherContext);
	const location = useLocation();
	const navigate = useNavigate();

	const isHomePage = location.pathname === "/";
	const hasPreviousPage = location.key !== "default";

	const navigateToFavorites = () => {
		if (location.pathname === "/FavoriteCities") {
			return;
		}
		navigate("/FavoriteCities");
	};

	const navigateToHome = () => {
		if (isHomePage) {
			return;
		}
		navigate("/");
	};

	const handleBack = () => {
		navigate(-1);
	}

	return (
		<header className="w-full fixed top-0 z-50 p-2 flex justify-center items-center bg-blue-800 border border-blue-300">
			<div className="absolute left-10 flex gap-5">
				<CustomButton
					disabled={!hasPreviousPage}
					onClick={handleBack}
					className="disabled:bg-black/5 disabled:text-blue-100"
				>
					<ArrowLeft/>
				</CustomButton>
				<CustomButton
					variant="link"
					onClick={navigateToHome}
					className="bg-black/30 text-blue-100 font-semibold"
				>
					Home
				</CustomButton>
			</div>

			<div className="w-full max-w-2/3">
				<WeatherSearch/>
			</div>

			<div className="absolute right-10 flex gap-5">
				{isHomePage &&
            <CustomButton
                variant="link"
                onClick={navigateToFavorites}
                className="bg-black/30 text-blue-100 font-semibold"
            >
                <List strokeWidth={3} className="inline mr-2"/>
                <span>Favorites</span>
            </CustomButton>
				}

				<CustomButton
					onClick={() => setTempUnit(prevState => prevState === "C" ? "F" : "C")}
					className="text-blue-100 font-semibold bg-black/30 border-none"
				>
					°{tempUnit === "C" ? "F" : "C"}
				</CustomButton>
			</div>
		</header>
	)
}