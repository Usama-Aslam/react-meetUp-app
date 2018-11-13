import React from "react";
import {
    lifecycle,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    DirectionsRenderer
} from "react-google-maps";

const MapWithDirectionComponent = compose(
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const { coords, destination } = props
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(coords.latitude, coords.longitude),
                destination: new google.maps.LatLng(destination.latitude, destination.longitude),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)
    (props =>
        <GoogleMap
            defaultZoom={7}
            defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
        >
            {props.directions && <DirectionsRenderer directions={props.directions} />}
            {props.isMarkerShown &&
                props.coords && (
                    <Marker
                        draggable={false}
                        position={{
                            lat: props.coords.latitude,
                            lng: props.coords.longitude
                        }}
                    />
                )}
            {props.isMarkerShown &&
                props.coords && (
                    <Marker
                        draggable={false}
                        position={{
                            lat: props.destination.latitude,
                            lng: props.destination.longitude
                        }}
                    />
                )}
        </GoogleMap>
    );

export default MyMapComponent;