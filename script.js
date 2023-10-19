document.addEventListener("DOMContentLoaded", () => {
    const apiKey = '7e9fba18f6msh0893974668988bdp10bd81jsn2d7c777d1070';
    const cityInput = document.getElementById("cityInput");
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    const weatherInfo = document.getElementById("weatherInfo");
    const weatherCity = weatherInfo.querySelector("h2");
    const weatherDescription = weatherInfo.querySelector("p");
  
    getWeatherBtn.addEventListener("click", () => {
      const city = cityInput.value.trim();
      if (city !== "") {
        getWeather(city);
        cityInput.value = "";
      }
    });
  
    async function getWeather(city) {
      const apiUrl = 'https://weatherapi-com.p.rapidapi.com/current.json';
  
      const url = `${apiUrl}?q=${city}`;
  
      const headers = {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      };
  
      const options = {
        method: 'GET',
        headers: headers
      };
  
      try {
        const response = await fetch(url, options);
  
        if (response.ok) {
          const result = await response.json();
          showWeather(result);
        } else {
          const errorData = await response.json(); // Attempt to parse error message
          showError(`Error: ${errorData.error ? errorData.error.message : 'Unknown error'}`);
        }
      } catch (error) {
        console.error(error);
        showError(`Error: ${error.message}`);
      }
    }
  
    function showWeather(result) {
      // Update the DOM with weather information
      weatherCity.textContent = result.location.name;
      weatherInfo.style.display = "block";
      weatherDescription.textContent = `Weather: ${result.current.condition.text}, Temperature: ${result.current.temp_c}°C`;
    }
  
    function showError(message) {
      weatherInfo.style.display = "none";
      alert(message);
    }
  });
  