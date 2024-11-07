"use client"

import React, { useEffect, useState } from "react";
import {MapContainer , TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

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
  const [position, setPosition] = useState<[number, number]>([latitude, longitude]);

  const MapEvents = () => {
    useMapEvents({
      dragend: (event) => {
        const { lat, lng } = event.target.getLatLng();
        setPosition([lat, lng]);
        onLocationChange(lat, lng);
      },
    });
    return null;
  };

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={position}
        icon={customIcon}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const latLng = e.target.getLatLng();
            setPosition([latLng.lat, latLng.lng]);
            onLocationChange(latLng.lat, latLng.lng);
          },
        }}
      />
      <MapEvents />
    </MapContainer>
  );
};

export default UserLocationMap;
