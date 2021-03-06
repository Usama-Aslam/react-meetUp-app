import React, { Component } from "react";
import MyMapComponent from "./GetMap/index";

class Steps4 extends Component {
    constructor() {
        super();
        this.state = {
            coords: { latitude: 24.8830931, longitude: 67.0685517 }
        };
        this.updateCoords = this.updateCoords.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    getPosition() {
        navigator.geolocation.getCurrentPosition(res => {
            this.setState({ coords: res.coords });
        });
        // console.log(this.state.coords)
    }

    updateCoords(latitude, longitude) {
        console.log(latitude, longitude)
        this.setState({ coords: { latitude, longitude } });
    }

    sendData() {
        const { getCurrentLocation } = this.props
        const { coords } = this.state
        getCurrentLocation(coords)
    }

    componentDidMount() {
        this.getPosition();
        const { coords } = this.state;
        coords && this.sendData()
    }

    // componentDidUpdate() {
    //     const { coords } = this.state
    //     coords && this.sendData()
    // }

    render() {
        const { coords } = this.state;
        return (
            <div style={{ maxWidth: '700px', height: "400px" }}>
                <MyMapComponent
                    updateCoords={this.updateCoords}
                    coords={coords}
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
}

export default Steps4;