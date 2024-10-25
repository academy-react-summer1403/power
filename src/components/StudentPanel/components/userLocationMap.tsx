import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const UserLocationMap = ({ latitude, longitude, onLocationChange }) => {
    const validatedLatitude = Number(latitude);
    const validatedLongitude = Number(longitude);
    const GOOGLE_MAPS_API_KEY = 'AIzaSyBbYruq_atcT5w';

    const lat = isNaN(validatedLatitude) ? 0 : validatedLatitude;
    const lng = isNaN(validatedLongitude) ? 0 : validatedLongitude;

    const onMapClick = (event) => {
        const { lat, lng } = event.latLng;
        if (onLocationChange) {
            onLocationChange(lat(), lng());
        }
    };

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                onClick={onMapClick}
                mapContainerStyle={{ height: '100%', width: '100%' }}
                center={{ lat, lng }}
                zoom={11}
            >
                <Marker position={{ lat, lng }} />
            </GoogleMap>
        </LoadScript>
    );
};
