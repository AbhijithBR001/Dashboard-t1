"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import DashboardLayout from "@/components/layout/dashboard-layout";

const MapComponent = () => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState([
    { id: 1, position: { lat: 19.4326, lng: -99.1332 }, color: "red" },
    { id: 2, position: { lat: 19.4356, lng: -99.1372 }, color: "blue" },
    { id: 3, position: { lat: 19.43, lng: -99.13 }, color: "yellow" },
    { id: 4, position: { lat: 19.428, lng: -99.139 }, color: "purple" },
    { id: 5, position: { lat: 19.436, lng: -99.127 }, color: "green" },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [zoom, setZoom] = useState(15);
  const [activeMarker, setActiveMarker] = useState(null);
  const [addingPin, setAddingPin] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
  };

  const center = {
    lat: 19.4326,
    lng: -99.1332,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AlzaSyvCBwD3iKJlCcv3rmpVjjAUp0-HUBP00fp",
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && mapInstance) {
      // Initialize autocomplete
      const searchInput = document.getElementById(
        "search-input"
      ) as HTMLInputElement;
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        searchInput
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();

        if (!place || !place.geometry || !place.geometry.location) {
          return;
        }

        // Pan to the searched location
        mapInstance.panTo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        mapInstance.setZoom(16);
      });
    }
  }, [isLoaded, mapInstance]);

  const onLoad = (map: React.SetStateAction<google.maps.Map | null>) => {
    setMapInstance(map);
  };

  const onUnmount = () => {
    setMapInstance(null);
  };

  const handleMarkerClick = (id: React.SetStateAction<null>) => {
    setActiveMarker(id);
  };

  const addNewPin = (event: google.maps.MapMouseEvent) => {
    if (addingPin) {
      const newMarker = {
        id: markers.length + 1,
        position: {
          lat: event.latLng?.lat() ?? 0,
          lng: event.latLng?.lng() ?? 0,
        },
        color: "red",
      };

      setMarkers([...markers, newMarker]);
      setAddingPin(false);
    }
  };

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Search will be handled by the autocomplete listener
    // This just prevents form submission
  };

  const renderCustomMarker = (marker: {
    id: any;
    position: any;
    color: any;
  }) => {
    return (
      <Marker
        key={marker.id}
        position={marker.position}
        onClick={() => handleMarkerClick(marker.id)}
        icon={{
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: marker.color,
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 10,
        }}
      />
    );
  };

  return (
    <DashboardLayout>
      <div className="map-container ml-8 w-full max-w-6xl mx-auto p-4 bg-white rounded-xl shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">
            Google Maps Integration
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            provides a visual representation of location-based data, using
            Google Maps to display user activities, service locations, or other
            geospatial information relevant to the admin's needs.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              id="search-input"
              type="text"
              placeholder="Search by location"
              className="flex-grow p-2 border border-gray-300 rounded-l-lg"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl"
            >
              Search
            </button>
            <button
              type="button"
              className="bg-gray-100 p-2 rounded-lg"
              onClick={() => {}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
            </button>
          </form>
        </div>

        <div className="relative">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={zoom}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={addNewPin}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                fullscreenControl: true,
              }}
            >
              {markers.map((marker) => renderCustomMarker(marker))}
            </GoogleMap>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span>Loading Map...</span>
            </div>
          )}

          <div className="absolute left-4 top-4 bg-white rounded-lg shadow-md p-2">
            <div className="flex flex-col gap-3">
              <button
                className="flex items-center justify-center flex-col p-2"
                onClick={() => setAddingPin(!addingPin)}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span className="text-xs mt-1">Add Pin</span>
              </button>

              <button className="flex items-center justify-center flex-col p-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
                <span className="text-xs mt-1">Marker</span>
              </button>

              <button
                className="flex items-center justify-center flex-col p-2 border-t"
                onClick={() => setShowTools(!showTools)}
              >
                <div className="w-6 h-6 flex items-center justify-center text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
                <span className="text-xs mt-1">Add Tools</span>
              </button>
            </div>
          </div>

          <div className="absolute right-4 bottom-4 flex items-center gap-2">
            <button
              className="bg-white p-1 rounded shadow"
              onClick={() => setZoom(zoom + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>

            <span className="bg-white px-2 py-1 rounded shadow text-sm">
              100%
            </span>

            <button
              className="bg-white p-1 rounded shadow"
              onClick={() => setZoom(Math.max(zoom - 1, 1))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapComponent;
