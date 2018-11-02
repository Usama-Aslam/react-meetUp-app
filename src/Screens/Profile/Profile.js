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

import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import FileUploader from "react-firebase-file-uploader";

import firebase from "../../Config/firebase"

const styles = theme => ({
    root: {
        width: '90%',
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
            checked: [{ check: [0] }, { check: [1] }, { check: [2] }],
            images: [coffee, juice, cocktail],
            nickName: null,
            phone: null,
            obj: {
                nickName: null,
                phone: null,
                avatar: null,
                images: [{
                    avatarURL1: null,
                    avatarURL2: null,
                    avatarURL3: null,
                }],
                location: [],
                bev: [],
                duration: []
            },
            // fileName: [{ name: null }, { name: null }, { name: null }]
            isUploading: false,
            progress: 0

        }
        this.updateText = this.updateText.bind(this)
        // this.updateFileName = this.updateFileName.bind(this)
    }

    // componentDidMount() {
    //     firebase.database().ref("/").on("child_added", data => {
    //         this.setState({ isAvailable: true })
    //     })
    // }

    handleUploadStart = () => {
        this.setState({ isUploading: true, progress: 0 });
        // Toast({
        //     type: 'info',
        //     title: 'Upload is start'
        // })
    };

    handleProgress = progress => {
        this.setState({ progress });
        // Toast({
        //     type: progress === 100 ? 'success' : 'info',
        //     title: progress === 100 ? 'Upload Complete' : `Uploaded: ${progress}%`
        // })
    };

    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
        // Toast({
        //     type: 'error',
        //     title: `Error: ${error}`
        // })
    };

    componentDidUpdate() {
        const { getImagesURL, handleChangeState } = this.props;
        let { avatarURL1, avatarURL2, avatarURL3 } = this.state.obj.images;

        if (avatarURL1 && avatarURL2 && avatarURL3) {
            let imgUrls = [avatarURL1, avatarURL2, avatarURL3]
            getImagesURL(imgUrls)
            handleChangeState(2)
        }
        //  else {
        //     handleChangeState(1)
        //     // Toast({
        //     //     type: "warning",
        //     //     title: "Please select all (3) images"
        //     // })
        // }
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

    handleToggle = (value, index) => () => {
        const { checked } = this.state;
        const currentIndex = checked[index].check.indexOf(value);
        const newChecked = [...checked];
        console.log(currentIndex)
        console.log("new checked", newChecked)
        if (currentIndex === -1) {
            newChecked[index].check.push(value);
            console.log("if new check", newChecked)
        }
        else {
            newChecked[index].check.splice(currentIndex, 1);
            console.log("else check", newChecked)
        }
        this.setState({
            checked: newChecked,
        });
    };

    updateText(e, id) {
        console.log(id)
        if (id == 'standard-name') {
            this.setState({
                nickName: e.target.value
            })
        }
        else {
            this.setState({
                phone: e.target.value
            })
        }
    }



    getStepContent(step) {
        const { classes } = this.props;
        const { checked, images, phone, nickName, fileName } = this.state

        switch (step) {
            case 0:
                return (
                    <form noValidate autoComplete="off" >
                        <TextField
                            id="standard-name"
                            label="Nick Name"
                            margin="normal"
                            className={classes.textField}
                            required
                            onChange={(e) => this.updateText(e, e.target.id)}
                        />
                        <TextField
                            id="standard-phoneNumber"
                            label="Phone Number"
                            type="number"
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.updateText(e, e.target.id)}
                        />
                    </form>
                );
            case 1:
                return (
                    <form noValidate autoComplete="off">
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span" className={classes.button}>
                                <FileUploader
                                    accept="image/*"
                                    name="avatar"
                                    randomizeFilename
                                    storageRef={firebase.storage().ref("images")}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                            </Button>
                        </label>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span" className={classes.button}>
                                <FileUploader
                                    accept="image/*"
                                    name="avatar"
                                    randomizeFilename
                                    storageRef={firebase.storage().ref("images")}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                            </Button>
                        </label>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span" className={classes.button}>
                                <FileUploader
                                    accept="image/*"
                                    name="avatar"
                                    randomizeFilename
                                    storageRef={firebase.storage().ref("images")}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                            </Button>
                        </label>
                    </form>);
            case 2:
                return (
                    <div id="beverageList">
                        {checked.map((outerValue, outerIndex) => {
                            return (
                                <Card className="beveragesCard">
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        className="beveragesImage"
                                        height="140"
                                        image={images[outerIndex]}
                                        title="Contemplative Reptile"
                                    />
                                    <List>
                                        {[20, 40, 60, 120].map((innerValue, innerIndex) => {
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

                                                    {/* {console.log("checked index", checked[outerIndex])} */}


                                                    <ListItemText primary={`Duration ${innerValue}`} />
                                                    <ListItemSecondaryAction>
                                                        <IconButton aria-label="Comments">
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                </Card>)
                        })}
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
        console.log(this.props)
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