// "use client"

// // components/MapPopup.js
// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
// import 'leaflet-defaulticon-compatibility';

// const MapPopup = ({ setCoordinates, address }: {setCoordinates: any, address: any}) => {
//   const [markerPosition, setMarkerPosition] = useState([1.3521, 103.8198]);

//   const fetchCoordinates = async (address: any) => {
//     try {
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
//         const data = await response.json();
//       if (data.length > 0) {
//         const { lat, lon } = data[0];
//         const position = [parseFloat(lat), parseFloat(lon)];
//         setMarkerPosition(position);
//         setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
//       }
//     } catch (error) {
//       console.error('Error fetching coordinates:', error);
//     }
//   };

//   const MapClickHandler = () => {
//     useMapEvents({
//       click(e: any) {
//         const { lat, lng } = e.latlng;
//         setMarkerPosition([lat, lng]);
//         setCoordinates({ lat, lng });
//       },
//     });
//     return null;
//   };

//   React.useEffect(() => {
//     if (address) {
//       fetchCoordinates(address);
//     }
//   }, [address]);

//   return (
//     <MapContainer
//       center={markerPosition}
//       zoom={13}
//       style={{ height: '400px', width: '400px' }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <MapClickHandler />
//       <Marker position={markerPosition} />
//     </MapContainer>
//   );
// };

// export default MapPopup;

