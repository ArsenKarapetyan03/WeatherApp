import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeatherPage } from "./weather/pages/WeatherPage";
import { FavoriteCities } from "./weather/pages/FavoriteCities.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherPage />} />
        <Route path="/favoriteCities" element={<FavoriteCities />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
