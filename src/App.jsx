import { useState } from 'react'
import './App.css'

function App() {

  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)

  const getLocation = () => {

    navigator.geolocation.getCurrentPosition((d) => {

      setLat(d.coords.latitude)
      setLon(d.coords.longitude)

    })
  }




  return (
    <>
      
      {
        lat!==0 && lon !== 0 ? 
        <>
          <h2>Latitude  {lat} , Longtitude  {lon} </h2>
        </> :""
      }
      
      
      <h3>GPS LOCATION</h3>

      <button onClick={()=>{getLocation()}} >Get Location</button>


    </>
  )
}

export default App
