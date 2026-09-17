# Weather dashboard

This React app loads current weather from OpenWeather and lets the user search
for another city.

## Project structure

```text
src/
├── App.tsx                         # Application entry page
├── App.css                         # Weather page styles
├── index.css                       # Global/reset styles
├── main.tsx                        # React bootstrap
└── features/
    └── weather/
        ├── api/
        │   └── weatherApi.ts       # HTTP requests and API response mapping
        ├── components/
        │   ├── WeatherCard.tsx     # Renders weather data
        │   └── WeatherSearch.tsx   # Search form and user input
        ├── hooks/
        │   └── useWeather.ts       # Loading, error, cancellation, and state
        ├── model/
        │   ├── weather.config.ts   # Default city
        │   └── weather.types.ts    # API and UI types
        └── pages/
            └── WeatherPage.tsx     # Composes the feature
```

The request belongs in `features/weather/api/weatherApi.ts`. The page calls
the `useWeather` hook, and `WeatherCard` paints the returned data. Components
do not call `fetch` directly.

## Setup

Create a `.env` file in the project root:

```env
VITE_API_KEY=your_openweather_api_key
```

Then run:

```bash
npm install
npm run dev
```
# WeatherApp
