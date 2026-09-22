import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeatherPage } from "./weather/pages/WeatherPage";
import { FavoriteCities } from "./weather/pages/FavoriteCities.tsx";
import { FAVORITE_CITIES } from "./weather/data/favoriteCities.ts";

function App() {

  const [cities, setCities] = useState<string[]>(FAVORITE_CITIES);
  const [search, setSearch] = useState<string | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherPage search={search} setSearch={setSearch} cities={cities} setCities={setCities} />} />
        <Route path="/favoriteCities" element={<FavoriteCities setSearch={setSearch} cities={cities} setCities={setCities} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
