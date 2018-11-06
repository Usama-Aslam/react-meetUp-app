import React, { Component } from 'react';
import coffee from "./../../Assets/Images/coffee.jpg"
import juice from "./../../Assets/Images/juice.jpg"
import cocktail from "./../../Assets/Images/cocktail.jpg"

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
import FileUploader from "react-firebase-file-uploader";

import firebase from "../../Config/firebase"

import Steps1 from "./Step1/index"
import Steps2 from "./Step2/index"
import Steps3 from "./Step3/index"

const styles = theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            activeStep: 0,
            // checked: [{ check: [0] }, { check: [0] }, { check: [0] }],
            img: [coffee, juice, cocktail],
            currentFileNumber: null,
            obj: {
                nickName: null,
                phone: null,
                avatar: null,
                images: [{ avatarURL: null }, { avatarURL: null }, { avatarURL: null }],
                location: [],
                bev: [],
                durations: [],
            },
        }
        this.updateText = this.updateText.bind(this)
        this.updateImageUrl = this.updateImageUrl.bind(this)
        this.updateDuration = this.updateDuration.bind(this)
        this.updateBeverage = this.updateBeverage.bind(this)
        this.removeBeverage = this.removeBeverage.bind(this)
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    getSteps() {
        return ['Enter Your Credentials', 'Upload Your Photos', 'Select Beverages', 'Current Map'];
    }

    updateDuration(e) {
        const { obj } = this.state;
        const { durations } = obj

        this.setState({
            obj: { ...obj, durations: [...e.target.value] }
        })
    }

    updateBeverage(element) {
        let { bev } = this.state.obj

        bev.push(element)

        this.setState({
            bev
        })
        console.log(bev)
    }

    removeBeverage(element) {
        let { bev } = this.state.obj

        bev.splice(bev.indexOf(element), 1)

        this.setState({
            bev
        })
        console.log(bev)
    }

    updateText(e, id) {
        let { nickName, phone } = this.state.obj;

        if (id == 'standard-name') {
            nickName = e.target.value
            this.setState({
                obj: { ...this.state.obj, nickName }
            })
        }
        else {
            phone = +e.target.value;
            this.setState({
                obj: { ...this.state.obj, phone }
            })
        }
    }

    updateImageUrl(downloadURL, fileN) {
        const { images } = this.state.obj
        images[fileN].avatarURL = downloadURL

        this.setState({
            images
        })
    }

    getStepContent(step) {
        const { classes } = this.props;
        const { checked, img, phone, nickName, fileName, obj } = this.state;


        switch (step) {
            case 0:
                return (
                    <Steps1 updateText={this.updateText} />
                );
            case 1:
                return (
                    <Steps2 obj={obj} updateImageUrl={this.updateImageUrl} />
                );
            case 2:
                return (
                    <div id="beverageList">
                        <Steps3 obj={obj} updateDuration={this.updateDuration} updateBeverage={this.updateBeverage} removeBeverage={this.removeBeverage} />
                        {/* {checked.map((outerValue, outerIndex) => {
                            return (
                              
                                <Card key={outerIndex} className="beveragesCard">
                                    <CardMedia
                                        component="img"
                                        className="beveragesImage"
                                        height="150"
                                        image={img[outerIndex]}
                                    />
                                    <List>
                                        {[20, 40, 120].map((innerValue, innerIndex) => {
                                            return (
                                                <ListItem
                                                    key={innerValue}
                                                    role={undefined}
                                                    dense
                                                    button
                                                    onClick={this.handleToggle(innerIndex, outerIndex)}
                                                    className={classes.listItem}
                                                >
                                                    <Checkbox
                                                        checked={checked[outerIndex].check.indexOf(innerIndex) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />

                                                    <ListItemText primary={`Duration ${innerValue}`} />
                                                    <ListItemSecondaryAction>
                                                        <IconButton aria-label="Comments">
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                </Card>
                            )
                        })} */}
                    </div>
                );
            case 3:
                return (<div>
                    Show Maps
                </div>)
            default:
                return 'Unknown step';
        }
    }
    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        console.log("profile images---", this.state.obj.images)
        console.log("dur---", this.state.obj.durations)

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    {this.getStepContent(index)}
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&quot;re finished</Typography>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
            </Button>
                    </Paper>
                )}
            </div>
        );
    };
}
Profile.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Profile);

// <List>
//     {[0, 1, 2, 3].map((value, index) => {
//         return
//         <ListItem
//             key={value}
//             role={undefined}
//             dense
//             button
//             onClick={this.handleToggle(value, index)}
//             className={classes.listItem}
//         >
//             <Checkbox
//                 checked={this.state.checked.indexOf(value) !== -1}
//                 tabIndex={-1}
//                 disableRipple
//             />
//             <ListItemText primary={`Line item ${value + 1}`} />
//             <ListItemSecondaryAction>
//                 <IconButton aria-label="Comments">
//                 </IconButton>
//             </ListItemSecondaryAction>
//         </ListItem>
//     })}
// </List>)