import axios from "axios";

export async function getWeatherByCity(city) {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key || !city) return null;

  try {
    const { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      { params: { q: city, appid: key, units: "metric" } }
    );
    return {
      name: data.name,
      temp: Math.round(data.main.temp),
      desc: data.weather?.[0]?.description || "",
      icon: data.weather?.[0]?.icon || "01d"
    };
  } catch {
    return null;
  }
}

export async function getDailyQuote() {
  try {
    const { data } = await axios.get("https://api.quotable.io/random");
    return { content: data.content, author: data.author };
  } catch {
    return { content: "Keep going. Consistency compounds.", author: "—" };
  }
}
