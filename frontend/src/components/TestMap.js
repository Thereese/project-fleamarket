//USING https://www.youtube.com/watch?v=BL2XVTqz9Ek
import React, { useState, useEffect } from "react"
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

export const TestMap = ({ updateFromMap }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (!isLoaded) {
    return <div>Loading..</div>
  }
  return <Map updateFromMap={updateFromMap} />
}

const Map = ({ updateFromMap }) => {
  const center = { lat: 59.3014, lng: 18.0061 }
  const [selected, setSelected] = useState(null)

  // run me when selected change
  useEffect(() => {
    // run function from prop
    // this function comes from TestMap
    updateFromMap(selected)
  }, [selected])

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={mapContainerStyle}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  )
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])
    setSelected({ lat, lng })
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => {
              console.log(place_id)
              return <ComboboxOption key={1} value={description} />
            })}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}
