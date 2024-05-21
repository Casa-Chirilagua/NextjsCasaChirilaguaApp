'use client'

import { useEffect, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import { setDefaults, fromAddress } from "react-geocode";
import { RiMapPin2Fill } from "react-icons/ri";

import Image from "next/image";
import { set } from "mongoose";
// import pin from "@/public/pin.png";

const MapCard = ({ address }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });

  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(null);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "us", // Default region for responses.
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(`${address.street} ${address.city} ${address.state} ${address.zip}`);

        //Check for results
        if(res.results.length === 0) {
          //No results found
          setGeocodeError(true);
          setLoading(false);
        }
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });

        setLoading(false);



      } catch (error) {
        //error);

        setGeocodeError(true);
        setLoading(false);
      }
    }
    fetchCoords();
  }, []);


  if (loading) return <div>Loading...</div>;

  if (geocodeError) return <div className="map-container">No Location data found</div>;

  return !loading && (
    <div className='map-container'>
      <Map mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'>
        <Marker longitude={lng} latitude={lat}>
          <RiMapPin2Fill color='red' style={{ fontSize: '3rem' }} />
        </Marker>
      </Map>
    </div>
  )

}

export default MapCard;