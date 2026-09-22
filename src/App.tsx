import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeatherPage } from "./weather/pages/WeatherPage";
import { FavoriteCities } from "./weather/pages/FavoriteCities.tsx";
import { FAVORITE_CITIES } from "./weather/data/favoriteCities.ts";
import { WeatherContext } from "./weather/hooks/Provider.tsx";

function App() {

	const [cities, setCities] = useState<string[]>(FAVORITE_CITIES);
	const [search, setSearch] = useState<string | null>(null);

	return (
		<BrowserRouter>
			<WeatherContext value={{cities, setCities, search, setSearch}}>
				<Routes>
					<Route
						path="/"
						element={<WeatherPage/>}
					/>
					<Route
						path="/favoriteCities"
						element={<FavoriteCities/>}
					/>
				</Routes>
			</WeatherContext>
		</BrowserRouter>
	);
}

export default App;
