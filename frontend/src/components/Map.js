import { React, useCallback, useState, useRef } from "react"
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import mapStyles from "../mapStyles"
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox"
import "@reach/combobox/styles.css"

const center = { lat: 59.3014, lng: 18.0061 }

const libraries = ["places"]
const mapContainerStyle = { width: "100%", height: "300px" }

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
}

export const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })
  console.log(process.env)
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)

  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ])
  }, [])

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(15)
  }, [])

  if (loadError) {
    return "Error loading maps"
  }
  if (!isLoaded) {
    return "Loading Maps"
  }

  return (
    <div className="mapbox">
      <h3 className="floatText">Markets</h3>

      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      {/* //Locate locks input to addressfield, why? */}
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={mapContainerStyle}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        v
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            //style the marker by adding an icon//17min in tutorial
            // https://www.youtube.com/watch?v=WZcxJGmLbSo
            onClick={() => {
              setSelected(marker)
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <div>
              <h2>here goes selected market</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}
function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          () => null
        )
      }}
    >
      <img src="https://via.placeholder.com/40" alt="compass - locate me" />
    </button>
  )
}
function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 59.3014, lng: () => 18.0061 },
      radius: 20 * 1000,
    },
  })

  return (
    <div className="search">
      <Combobox
        className="searchinput"
        onSelect={async (address) => {
          setValue(address, false)
          clearSuggestions()

          try {
            const results = await getGeocode({ address })
            const { lat, lng } = await getLatLng(results[0])
            panTo({ lat, lng })
          } catch (error) {
            console.log("error")
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}
