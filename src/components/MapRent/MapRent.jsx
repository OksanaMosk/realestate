import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRent } from 'redux/rent/rent.selector';
import { GoogleMap, InfoWindow } from '@react-google-maps/api';
import { CurrentLocationMarker } from '../CurrentLocationMarker';
import { fetchRentHome } from 'redux/rent/rent.reducer';
import { NavLink } from 'react-router-dom';

import iconBath from '../images/iconBath.png';
import iconBed from '../images/iconBed.png';
import iconSizeFt from '../images/iconSizeFt.png';
import iconSizeM from '../images/iconSizeM.png';

import css from './MapRent.module.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};
const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: true,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenContron: false,
};

const MapRent = ({ center }) => {
  const listResults = useSelector(selectRent);
  const dispatch = useDispatch();
  const mapRef = React.useRef(undefined);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = undefined;
  }, []);

  React.useEffect(() => {
    dispatch(fetchRentHome());
  }, [dispatch]);

  const renderInfoWindowContent = marker => (
    <div className={css.everyItem} key={marker.id}>
      {marker.imgSrc && (
        <img
          className={css.everyItemImg}
          src={marker.imgSrc}
          alt={`House ${marker.lotId}`}
          style={{ width: 'auto', maxHeight: '100px' }}
        />
      )}
      <div className={css.about}>
        {/* <p className={css.price}>{marker.price.toLocaleString()}</p> */}
        <p
          className={css.address}
          style={{
            whiteSpace: 'pre-wrap',
            maxWidth: '23ch',
            overflowWrap: 'break-word',
          }}
        >
          {marker.address.replace(/,([^,]{0,10})$/, ',\u00A0$1')}
        </p>
        <div className={css.aboutDetails}>
          <p>
            <img
              className={css.icon}
              src={iconBath}
              alt="iconBath"
              style={{ width: '15px', height: '15px' }}
            />
            {marker.beds}
          </p>
          <p>
            <img
              className={css.icon}
              src={iconBed}
              alt="iconBed"
              style={{ width: '15px', height: '15px' }}
            />
            {marker.baths}
          </p>
          <p>
            <img
              className={css.icon}
              src={iconSizeFt}
              alt="iconSizeFt"
              style={{ width: '15px', height: '15px' }}
            />
            {marker.area} sqft
          </p>
          <p>
            <img
              className={css.icon}
              src={iconSizeM}
              alt="iconSizeM"
              style={{ width: '15px', height: '15px' }}
            />
            {(marker.area / 10.7638).toFixed(2)} m²
          </p>
        </div>
        <NavLink
          className={css.toHomeElement}
          key={marker.id}
          to={`/rent/${marker.lotId}`}
          onClick={() => setSelectedMarker(marker)}
        >
          View details
        </NavLink>
      </div>
    </div>
  );

  return (
    <div className={css.container}>
      <GoogleMap
        className={css.googleMap}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {listResults.length
          ? listResults.map(result => (
              <CurrentLocationMarker
                key={result.lotId && result.lotId.toString()}
                position={{
                  lat: parseFloat(result.latLong.latitude),
                  lng: parseFloat(result.latLong.longitude),
                }}
                onClick={() => setSelectedMarker(result)}
                lotId={result.lotId}
              />
            ))
          : null}
        {selectedMarker?.lotId && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedMarker.latLong.latitude),
              lng: parseFloat(selectedMarker.latLong.longitude),
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className={css.itemHome}>
              {renderInfoWindowContent(selectedMarker)}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export { MapRent };
