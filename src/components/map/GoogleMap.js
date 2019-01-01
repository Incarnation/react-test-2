import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from "react-google-maps";

const MapComponent = props => {
  const { coordinates } = props;

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
    >
      <Circle center={coordinates} radius={500} />
    </GoogleMap>
  );
};

function withGeoCode(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        }
      };
    }

    componentWillMount() {
      this.geoCodeLocation();
    }

    geoCodeLocation() {
      const location = this.props.location;

      const geocode = new window.google.maps.Geocoder();

      geocode.geocode({ address: location }, (result, status) => {
        if (status === "OK") {
          const gemoetry = result[0].geometry.location;
          const coordinates = { lat: gemoetry.lat(), lng: gemoetry.lng() };

          this.setState({
            coordinates: coordinates
          });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    }

    render() {
      //alert(this.props.location);
      return <WrappedComponent {...this.state} />;
    }
  };
}

export const MapWithGeoCode = withScriptjs(
  withGoogleMap(withGeoCode(MapComponent))
);
