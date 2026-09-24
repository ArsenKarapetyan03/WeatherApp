import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeatherPage } from "./weather/pages/WeatherPage";
import { FavoriteCitiesPage } from "./weather/pages/FavoriteCitiesPage.tsx";
import { FAVORITE_CITIES } from "./weather/data/favoriteCities.ts";
import { WeatherContext } from "./weather/hooks/Provider.tsx";
import type { TempUnit } from "./weather/model/weather.types.ts";

function App() {
	const [cities, setCities] = useState<string[]>(FAVORITE_CITIES);
	const [search, setSearch] = useState<string | null>(null);
	const [tempUnit, setTempUnit] = useState<TempUnit>("C");

	return (
		<BrowserRouter>
			<WeatherContext value={{cities, setCities, search, setSearch, tempUnit, setTempUnit}}>
				<Routes>
					<Route
						path="/"
						element={<WeatherPage />}
					/>
					<Route
						path="/favorite-cities-page"
						element={<FavoriteCitiesPage />}
					/>
				</Routes>
			</WeatherContext>
		</BrowserRouter>
	);
}

export default App;
