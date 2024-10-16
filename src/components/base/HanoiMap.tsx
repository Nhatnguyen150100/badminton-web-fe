import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ILatLng } from '../../types/badmintonCourt.types';

const ClickableMap: React.FC<{
  setMarkerPosition: (latlng: ILatLng | null) => void;
}> = ({ setMarkerPosition }) => {
  useMapEvents({
    click: (event) => {
      setMarkerPosition(event.latlng);
    },
  });

  return null;
};

interface IProps {
  location?: ILatLng;
  handleClickMap: (latlng: ILatLng | null) => void;
}

const checkLatLng = (position: ILatLng | null): ILatLng | null => {
  if (!position) {
    return null;
  }
  if (isNaN(position.lat) || isNaN(position.lng)) {
    return null;
  }
  return position;
};

export default function HanoiMap({ location, handleClickMap }: IProps) {
  const [markerPosition, setMarkerPosition] = useState<ILatLng | null>(
    checkLatLng(location ?? null),
  );

  return (
    <MapContainer
      center={[21.0285, 105.804]}
      zoom={13}
      style={{ height: '360px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClickableMap
        setMarkerPosition={(latlng) => {
          setMarkerPosition(latlng);
          handleClickMap(latlng);
        }}
      />
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>
            Vị trí sân cầu: {markerPosition.lat.toFixed(5)},{' '}
            {markerPosition.lng.toFixed(5)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
