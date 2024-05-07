import axios from "axios"
import { useState } from 'react'
import './App.css'

function App() {

  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [data,setData] = useState([])
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLat(latitude);
      setLon(longitude);

      // Make API call inside the callback function
      const options = {
        method: 'GET',
        url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
        params: {
          location: `${latitude},${longitude}`,
          language: 'en'
        },
        headers: {
          'X-RapidAPI-Key': 'd3383b31c4msh9571344659e2104p13f011jsnb6060dd4bb87',
          'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
        }
      };

      axios.request(options)
        .then((response) => {
          setData(response.data.results[1].type)
          console.log(response.data.results[1].type);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };






  // Define the home location coordinates
  const homeLatitude = lat;
  const homeLongitude = lon;
  function isAtHome(currentLatitude, currentLongitude) {
    const tolerance = 0.01;
    const distance = calculateDistance(currentLatitude, currentLongitude, homeLatitude, homeLongitude);

    if (distance <= tolerance) {
      return true;
    } else {
      return false;
    }
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
  if (isAtHome(lat, lon)) {
    console.log("Person is at home");
  } else {
    console.log("Person is outside");
  }
  isAtHome(lat, lon)











  return (
    <>

      {
        lat !== 0 && lon !== 0 ?
          <>
            <h2>Latitude  {lat} , Longtitude  {lon} </h2>
          </> : ""
      }


      <h3>GPS LOCATION</h3>

      <button onClick={() => { getLocation() }} >Get Location</button>

      <p>Person is at our home or not? <span id="atHome">{data ? data : ""}</span> </p>


    </>
  )
}

export default App
