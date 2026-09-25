import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeatherPage } from "./pages/WeatherPage";
import { FavoriteCitiesPage } from "./pages/FavoriteCitiesPage.tsx";
import { MainLayout } from "./layouts/MainLayout.tsx";
import { FAVORITE_CITIES } from "./data/favoriteCities.ts";
import { WeatherContext } from "./hooks/WeatherContext.ts";
import type { TempUnit } from "./model/weather.types.ts";

function App() {
	const [cities, setCities] = useState<string[]>(FAVORITE_CITIES);
	const [search, setSearch] = useState<string | null>(null);
	const [tempUnit, setTempUnit] = useState<TempUnit>("C");

	return (
		<BrowserRouter>
			<WeatherContext value={{cities, setCities, search, setSearch, tempUnit, setTempUnit}}>
				<Routes>
					<Route element={<MainLayout />}>
						<Route
							path="/"
							element={<WeatherPage />}
						/>
						<Route
							path="/favorite-cities-page"
							element={<FavoriteCitiesPage />}
						/>
					</Route>
				</Routes>
			</WeatherContext>
		</BrowserRouter>
	);
}

export default App;
