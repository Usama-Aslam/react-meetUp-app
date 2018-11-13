/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"

class Directions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            err: ""
        }
        this.getDirections = this.getDirections.bind(this)
    }

    getDirections() {
        const { coords, destination } = this.props
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
                this.setState({
                    err: "Sorry! Can't calculate directions!"
                })
            }
        });
    }

    render() {
        const { directions, err } = this.state
        const { coords, destination } = this.props
        console.log("erro", err)
        return (
            <div>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBrrOsrvThKXpEt-1ZoAP9DhpwRs1B5l4E&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    directions={directions}
                    coords={coords}
                    destination={destination}
                />
                <br />
                <center><Button variant="contained" color="primary" onClick={this.getDirections}>Get Directions</Button></center>
                <Typography variant="caption" color="secondary" align="right">{err}</Typography>
            </div>
        )
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={13}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >

        <Marker position={{ lat: props.coords.latitude, lng: props.coords.longitude }} />
        <Marker position={{ lat: props.destination.latitude, lng: props.destination.longitude }} />

        {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
))

export default Directions