
const cityInput  = document.getElementById('city')
const suggestionsList = document.getElementById('suggestions');
async function Getlocation() {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput.value}&count=10&language=en&format=json`;
  try {
    const response = await fetch(url);  
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

   const data = await response.json();
    console.log(data.results)
    displaySuggestions(data.results || []);
  } catch (error) {
    console.error(error.message);
  }
}


function displaySuggestions(results) {
    suggestionsList.innerHTML = '';

results.forEach(location => {
    const li = document.createElement('li');
    li.textContent = `${location.name}, ${location.country}`;
    li.className = 'px-4 py-2 hover:bg-blue-100 cursor-pointer text-black';
    
    li.addEventListener('click', () => {
      cityInput.value = `${location.name}, ${location.country}`;
      Getlocation()
      suggestionsList.innerHTML = '';
      suggestionsList.classList.add('hidden');
    });
    
    suggestionsList.appendChild(li);
  });
  
  suggestionsList.classList.remove('hidden');
}
window.Getlocation = Getlocation
window.displaySuggestions = displaySuggestions
// async function getData() {
//   const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,precipitation,relative_humidity_2m,is_day,wind_speed_10m,apparent_temperature";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// window.getData = getData