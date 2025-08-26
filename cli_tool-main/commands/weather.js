const axios = require("axios");
const logger = require("../utils/logger");
require("dotenv").config();

async function weatherData(city) {
  try {
    apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      "https://api.weatherapi.com/v1/current.json",
      {
        params: {
          key: apiKey,
          q: city,
        },
      }
    );

    const data = response.data;
    console.log(
      `Weather in ${data.location.name}, ${data.location.region}, ${data.location.country}:`
    );
    console.log(`Temperature: ${data.current.temp_c}°C`);
    console.log(`Condition: ${data.current.condition.text}`);
    console.log(`Humidity: ${data.current.humidity}%`);
    console.log(`Wind: ${data.current.wind_kph} kph`);
  } catch (error) {
    logger.error(`Error fetching weather data`);
  }
}

module.exports = {
  weatherData,
};
