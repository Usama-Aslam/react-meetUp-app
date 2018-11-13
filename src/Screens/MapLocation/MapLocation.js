import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import classNames from 'classnames';

//expansion panel
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { firebase, checkAuth } from "../../Config/firebase"

// import MyMapComponent from "./GetMap/GetMap";
import Modal from '@material-ui/core/Modal';

import "./style.css"


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 2,
        // width: '100%'
    }, heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        alignItems: 'left',
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    columnSeconday: {
        flexBasis: '38.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    }
});


class Locations extends Component {
    constructor() {
        super()
        this.state = {
            coords: { latitude: null, longitude: null },
            destination: {
                latitude: null, longitude: null
            },
            nearLocations: [],
            searchLocations: [],
            searchQuery: [],
            expanded: null,
        };
        this.updateCoords = this.updateCoords.bind(this);
        this.sendData = this.sendData.bind(this);
        this.getUsersData = this.getUsersData.bind(this);
        this.updateText = this.updateText.bind(this);
        this.getSearchData = this.getSearchData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getNavigation = this.getNavigation.bind(this);
        this.next = this.getNavigation.bind(this)
        this.getUsersData()
        checkAuth()
    }

    updateText(e) {
        let { searchQuery } = this.state
        this.setState({
            searchQuery: e.target.value
        })
        this.getSearchData(e)
    }

    getUsersData() {
        // const uid = firebase.auth().currentUser.uid
        const uid = "K9DwEyp0KRUxofHRaVh17OViU9w2"
        const { coords } = this.state

        firebase.database().ref("/").child(`Registration/${uid}/`).once("value", async data => {
            console.log("Usersdata", data.val())

            const obj = data.val()
            coords.latitude = obj.location.lat
            coords.longitude = obj.location.lng
            this.setState({
                coords
            })

        }).then(() => {
            const { latitude, longitude } = this.state.coords
            // console.log("lattt", latitude, longitude)
        })
    }

    getSearchData(e) {
        const { searchQuery } = this.state
        // let search = e.target.value

        fetch(`https://api.foursquare.com/v2/venues/search?client_id=FD2M3OMDXXYO150PZCICZG1FURKJGD5HIRJLNSXBDM110KYT&client_secret=UD3VB3ZECV5RJZFYADVPA31TUAWJX05RUJHZIHQWI4YU3BXX&v=20180323&query=${searchQuery}&ll=24.883460,67.047375&radius=5000`)
            .then((res) => {
                // console.log("api", res.json())
                return res.json()
            }).then(result => {
                let { searchLocations } = this.state;
                searchLocations = result.response.venues
                console.log("search result", searchLocations)
                this.setState({
                    searchLocations
                })
            })
    }

    getPlaceData() {
        const { latitude, longitude } = this.state.coords
        console.log("lat,long", latitude, longitude)

        fetch(`https://api.foursquare.com/v2/venues/explore?client_id=FD2M3OMDXXYO150PZCICZG1FURKJGD5HIRJLNSXBDM110KYT&client_secret=UD3VB3ZECV5RJZFYADVPA31TUAWJX05RUJHZIHQWI4YU3BXX&v=20180323&ll=${latitude},${longitude}&radius=5000&limit=5&sortByDistance=1`)
            .then((res) => {
                // console.log("api", res.json())
                return res.json()
            }).then(result => {
                let { nearLocations } = this.state;
                nearLocations = result.response.groups[0].items
                console.log("result", result)
                this.setState({
                    nearLocations
                })
            })
    }

    updateCoords(latitude, longitude) {
        console.log(latitude, longitude)
        this.setState({ coords: { latitude, longitude } });
    }

    sendData() {
        // const { getCurrentLocation } = this.props
        // const { coords } = this.state
        // getCurrentLocation(coords)
    }

    componentDidMount() {
        this.getPlaceData()
        // this.getSearchData()
    }

    handleChange(e) {
        let { expanded } = this.state
        this.setState({
            expanded: !this.state.expanded
        })
    }

    getNavigation(lat, lng) {
        const { destination } = this.state
        destination.latitude = lat
        destination.longitude = lng
        this.setState({
            destination,
            showMap: true
        })
        console.log("destination", lat, lng)
    }
    render() {
        const { classes } = this.props
        const { coords, nearLocations, searchQuery, searchLocations, expanded } = this.state
        console.log("location", this.state.destination)
        // searchLocations == false ? nearLocations : searchLocations
        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <FormControl fullWidth className={classNames(classes.formControl, 'formControl')}>
                        <InputLabel htmlFor="component-simple">Search Nearest Location</InputLabel>
                        <Input id="component-simple" onChange={(e) => this.updateText(e)} />
                    </FormControl>
                </Paper>
                <div className="nearestLocation_div">
                    {searchQuery.length == 0 && nearLocations.map((items, index) => {
                        return <div>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className={classNames(classes.column, "locationHeading_div")}>
                                        <Typography className={classes.heading}>{index + 1}- Location</Typography>
                                    </div>
                                    <div className={classNames(classes.column, 'locationName_div')}>
                                        <Typography className={classes.secondaryHeading} variant="h5" component="h3">{items.venue.name}</Typography>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div className={classes.column} />
                                    <div className={classNames(classes.columnSeconday, "locationAddress_div")}>
                                        <Typography component="p"> <b>Cross Street : </b>{items.venue.location.formattedAddress[0]} {items.venue.location.formattedAddress[1]} {items.venue.location.formattedAddress[2]}</Typography>
                                    </div>
                                    <ExpansionPanelActions>
                                        <Button size="small"
                                            onClick={() => { this.getNavigation(items.venue.location.lat, items.venue.location.lng) }}
                                        >Get Location</Button>
                                        <Button size="small" color="primary"
                                            onClick={() => { this.next() }}
                                        >
                                            Next
                                    </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanelDetails>
                                <Divider />
                            </ExpansionPanel>

                        </div>
                    })}
                </div>
                <div className="searchLocation_div">
                    {searchQuery.length > 0 && searchLocations.map((items, index) => {
                        return <div>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className={classNames(classes.column, "locationHeading_div")}>
                                        <Typography className={classes.heading}>{index + 1}- Location</Typography>
                                    </div>
                                    <div className={classNames(classes.column, 'locationName_div')}>
                                        <Typography className={classes.secondaryHeading} variant="h5" component="h3">{items.name}</Typography>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div className={classes.column} />
                                    <div className={classNames(classes.columnSeconday, "locationAddress_div")}>
                                        <Typography component="p"> <b>Cross Street : </b>{items.location.formattedAddress[0]} {items.location.formattedAddress[1]} {items.location.formattedAddress[2]}</Typography>
                                    </div>
                                    <ExpansionPanelActions>
                                        <Button size="small"
                                            onClick={() => { this.getNavigation(items.location.lat, items.location.lng) }}
                                        >Get Location</Button>
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => { this.next() }}
                                        >
                                            Next
                                    </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanelDetails>
                                <Divider />
                            </ExpansionPanel>
                        </div>
                    })}
                </div>
                {/* <div style={{ maxWidth: '700px', height: "400px" }}>
                    <MyMapComponent
                        updateCoords={this.updateCoords}
                        coords={coords}
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div> */}
            </div>
        );
    }
}
/* <div style={{ maxWidth: '700px', height: "400px" }}>
    <MyMapComponent
        updateCoords={this.updateCoords}
        coords={coords}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
</div>*/
Locations.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locations);

