async function getWeather() {
    const location = document.getElementById("locationInput").value.trim();
    const errorDiv = document.getElementById("error");
    const weatherCard = document.getElementById("weatherCard");
  
    if (!location) {
      errorDiv.textContent = "Please enter a location.";
      weatherCard.classList.add("hidden");
      return;
    }
  
    const apiKey = "718885ed4ff7447e821190122252905";
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Location not found.");
      const data = await response.json();
  
      document.getElementById("cityName").textContent = `${data.location.name}, ${data.location.country}`;
      document.getElementById("temperature").textContent = data.current.temp_c;
      document.getElementById("condition").textContent = data.current.condition.text;
      document.getElementById("humidity").textContent = data.current.humidity;
      document.getElementById("wind").textContent = data.current.wind_kph;
      document.getElementById("aqi").textContent = data.current.air_quality.pm2_5.toFixed(2);
      document.getElementById("weatherIcon").src = data.current.condition.icon;
  
      weatherCard.classList.remove("hidden");
      errorDiv.textContent = "";
    } catch (err) {
      weatherCard.classList.add("hidden");
      errorDiv.textContent = `Error: ${err.message}`;
    }
  }
  
  function updateTime() {
    const now = new Date();
    const options = { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: true };
    document.getElementById("dateTime").textContent = now.toLocaleString('en-US', options);
  }
  setInterval(updateTime, 1000);
  updateTime();
  