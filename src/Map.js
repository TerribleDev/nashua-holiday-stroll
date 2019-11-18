import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
// import { eventLocations } from './eventLocations.js';
// const markers = eventLocations.map( i => <Marker position={{lat: i.lat, lng: i.lng}} />)

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: 42.7564758, lng: -71.4673018 }}>
      {/* {markers} */}
    </GoogleMap>
  ))
);

export default function() {
  return (
    <div>
      <MyMapComponent
        isMarkerShown
        googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCPvocvFiqD8QJ8pH9_BjEUzjQZhmalfoE "}
        mapElement={<div style={{ position: "relative", height: `100%` }} />}
        containerElement={<div style={{height: "50vh"}} />}
        loadingElement={<div />}
      />
    </div>
  );
}
