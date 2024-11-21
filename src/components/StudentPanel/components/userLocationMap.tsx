"use client"

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 0,
  lng: 0,
};

interface UserLocationMapProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
}

const UserLocationMap: React.FC<UserLocationMapProps> = ({
  latitude,
  longitude,
  onLocationChange,
}) => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: latitude,
    lng: longitude,
  });

  useEffect(() => {
    setPosition({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  const onMarkerDragEnd = (event: google.maps.MouseEvent) => {
    const lat = event.latLng!.lat();
    const lng = event.latLng!.lng();
    setPosition({ lat, lng });
    onLocationChange(lat, lng);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={13}
        onDragEnd={(event) => {
          const lat = event.getCenter().lat();
          const lng = event.getCenter().lng();
          setPosition({ lat, lng });
          onLocationChange(lat, lng);
        }}
      >
        <Marker
          position={position}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default UserLocationMap;
