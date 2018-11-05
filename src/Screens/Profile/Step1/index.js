import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

class Steps1 extends Component {
    constructor(props) {
        super(props);
    }
    // static getDerivedStateFromProps(props, state) {
    //     console.log("nextProps", props)
    //     console.log("nextState", state)
    // }
    render() {
        const { classes, updateText } = this.props;

        // console.log(this.props);

        return (
            < form noValidate autoComplete="off" >
                <TextField
                    id="standard-name"
                    label="Nick Name"
                    margin="normal"
                    className={classes.textField}
                    required
                    onChange={(e) => updateText(e, e.target.id)}
                />
                <TextField
                    id="standard-phoneNumber"
                    label="Phone Number"
                    type="number"
                    className={classes.textField}
                    margin="normal"
                    onChange={(e) => updateText(e, e.target.id)}
                />
            </form >)
    }
}
export default withStyles(styles)(Steps1);