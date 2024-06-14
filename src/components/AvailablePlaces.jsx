import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import {sortPlacesByDistance} from "../loc.js"

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setavailablePlaces] = useState([]);

  /* useEffect(()=>{
  fetch('http://localhost:3000/places')
  .then((response)=> {return response.json()})
  .then((resData)=>{
    setavailablePlaces(resData.places);
  })

},[]) */

  //Alternate way to use fetch method
  useEffect(() => {
    try {
      async function fetchPlaces() {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces = sortPlacesByDistance(resData.places,
            position.coords.latitude,
            position.coords.longitude)
            setavailablePlaces(sortedPlaces);
        });
  
      }
      fetchPlaces();
    } catch (error) {
      console.log("error", error);
    }
    
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
