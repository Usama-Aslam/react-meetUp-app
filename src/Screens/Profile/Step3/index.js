import React, { Component } from 'react';
import "./style.css"

import coffee from "../../../Assets/Images/coffee.jpg"
import juice from "../../../Assets/Images/juice.jpg"
import cocktail from "../../../Assets/Images/cocktail.jpg"

import firebase from "../../../Config/firebase"

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Chip from '@material-ui/core/Chip';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
// import FileUploader from "react-firebase-file-uploader";


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 140,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, that) {
    return {
        fontWeight:
            that.state.name.indexOf(name) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}

class MultipleSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: [],
            duration: [20, 40, 60],
            checked: [{ check: false, drink: "coffee" }, { check: false, drink: "juice" }, { check: false, drink: "cocktail" }],
            img: [coffee, juice, cocktail],
        };

    }
    static getDerivedStateFromProps(nextState, nextProps) {
        console.log("next", nextState)
    }
    handleChange = event => {
        const { updateDuration } = this.props
        updateDuration(event)
        const { name } = this.state
        this.setState({ name: event.target.value })
    };

    handleToggle = (index) => () => {
        const { checked } = this.state;
        const { updateBeverage, removeBeverage } = this.props

        checked[index].check = !(checked[index].check)

        console.log(index)

        this.setState({
            checked
        })
        console.log(checked[index].check)
        checked[index].check ? updateBeverage(checked[index].drink) : removeBeverage(checked[index].drink)
    };


    render() {
        const { classes } = this.props;
        const { checked, img, duration } = this.state;

        console.log("duration", this.props.obj)

        return (
            <div className={classes.root}>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple-chip" className="chiping">Select Duration</InputLabel>
                    <Select
                        className="chiping"
                        multiple
                        value={this.state.name}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                        )}
                    >
                        {duration.map(name => (
                            <MenuItem key={name} value={name} style={getStyles(name, this)}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {checked.map((outerValue, outerIndex) =>
                    <Card className="beveragesCard">
                        <CardMedia
                            component="img"
                            className="beveragesImage"
                            height="150"
                            image={img[outerIndex]}
                        />
                        <List>
                            <ListItem
                                role={undefined}
                                dense
                                button
                                onClick={this.handleToggle(outerIndex)}
                                className={classes.listItem}
                            >
                                <Checkbox
                                    checked={checked[outerIndex].check !== false}
                                    tabIndex={-1}
                                    disableRipple
                                />

                                <ListItemText primary={`Select Drink`} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Card>)}
            </div>
        );
    }
}

MultipleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);