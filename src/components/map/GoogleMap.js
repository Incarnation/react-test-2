//required imports
import React from "react";
import { Cacher } from "services/cacher";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  InfoWindow
} from "react-google-maps";

//map component
const MapComponent = props => {
  //get the coordinates from the props which is from the withGeoCode function
  const { coordinates, isError, isLocationLoaded } = props;

  //google map component
  return (
    <GoogleMap
      options={{ disableDefaultUI: isError ? true : false }}
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
    >
      {!isError && isLocationLoaded && (
        <Circle center={coordinates} radius={500} />
      )}
      {isError && isLocationLoaded && (
        <InfoWindow position={coordinates} options={{ maxWidth: 300 }}>
          <div>There is a problem to find the location on the map</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

//higher order function withGeoCode that return another component
function withGeoCode(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      //debugger;
      //initialize cacher
      this.cacher = new Cacher();
      //console.log(this.cacher);

      //initialize state
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        isError: false,
        isLocationLoaded: false
      };
      //bind this
      //this.geoCodeLocation = this.geoCodeLocation.bind(this);
    }

    //when the component first load up call the function geoCodeLocation
    componentWillMount() {
      this.getGeoCodeLocation();
    }

    geoCodeLocation(location) {
      const geocode = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocode.geocode({ address: location }, (result, status) => {
          if (status === "OK") {
            const gemoetry = result[0].geometry.location;
            const coordinates = { lat: gemoetry.lat(), lng: gemoetry.lng() };

            //cache the values in to the memory
            this.cacher.cacheValue(location, coordinates);

            //successfully getting the coordinates call resolve
            resolve(coordinates);
          } else {
            //fail getting the location
            reject(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      });
    }

    //call geocode api to get the coordinates
    getGeoCodeLocation() {
      const location = this.props.location;

      //check if the geocode is cache if cached return the cached value instead
      if (this.cacher.isValueCached(location)) {
        console.log("location is in cache");
        //if the location is in the cache
        //call setState directly to set the coordinates
        this.updateCoordinates(this.cacher.getCachedValue(location));
      } else {
        //if not in the cache
        //return a new promose
        this.geoCodeLocation(location).then(
          //set the state after successfully getting the location
          coordinates => {
            this.updateCoordinates(coordinates);
          },
          //set the state isError to true
          error => {
            this.setState({ isError: true, isLocationLoaded: true });
          }
        );
      }
    }

    updateCoordinates(coordinates) {
      this.setState({
        coordinates: coordinates,
        isLocationLoaded: true
      });
    }

    render() {
      //alert(this.props.location);
      //get the MapComponent as the WrappedComponent
      //and passing all the states in to the newly created component
      return <WrappedComponent {...this.state} />;
    }
  };
}

//higher order functions that connect all together
export const MapWithGeoCode = withScriptjs(
  withGoogleMap(withGeoCode(MapComponent))
);
