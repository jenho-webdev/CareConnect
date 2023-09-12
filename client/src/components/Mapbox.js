import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

// Load environment variables from .env

export default function Mapbox() {
  const [viewport, setViewport] = useState({
    width: "100vh",
    height: "100vh",
    latitude: 37.7749, // Replace with your desired latitude
    longitude: -122.4194, // Replace with your desired longitude
    zoom: 10,
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
      >
        markers here
      </ReactMapGL>
    </div>
    //   {...viewport}
    //   mapboxApiAccessToken={mapbox_key}
    //   onViewportChange={(newViewport) => setViewport(newViewport)}
    //   mapStyle="mapbox://styles/mapbox/streets-v11"
    // >
    //   {/* Add a marker */} {/* Render the marker using the prop data */}
    //   {marker && (
    //     <Marker latitude={marker.latitude} longitude={marker.longitude}>
    //       <div className="marker">
    //         {/* You can customize the marker's appearance here */}
    //         <img src="/marker-icon.png" alt="Marker" />
    //       </div>
    //     </Marker>
    //   )}
    // </ReactMapGL>
  );
}
