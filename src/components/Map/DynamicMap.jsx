import { useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';
import Attractions from '@components/Markers/attractions';
import Settlements from '@components/Markers/settlements';

const { MapContainer, TileLayer, CircleMarker } = ReactLeaflet;

export default function Map ({ children, className, width, height, selection, ...rest }) {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selection === 'settlements' &&(
        <Settlements />
      )}
      {selection === 'attractions' &&(
        <Attractions />
      )}
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  )
}