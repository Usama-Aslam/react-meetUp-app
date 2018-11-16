import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import AccountCircle from '@material-ui/icons/AccountCircle';

import PhoneCircle from '@material-ui/icons/Phone';

import Grid from '@material-ui/core/Grid';

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

    render() {
        const { classes, updateText } = this.props;

        //we are sending id and value to use only one function for updating text
        return (
            < form noValidate autoComplete="off" >
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="standard-name"
                            label="Nick Name"
                            margin="normal"
                            className={classes.textField}
                            required
                            onChange={(e) => updateText(e, e.target.id)}

                        />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <PhoneCircle />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="standard-phoneNumber"
                            label="Phone Number"
                            type="number"
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => updateText(e, e.target.id)}
                        />
                    </Grid>
                </Grid>
            </form >)
    }
}
export default withStyles(styles)(Steps1);