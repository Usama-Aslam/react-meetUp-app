import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SideMenu from "./../sideMenu/SideMenu";

import { Link } from 'react-router-dom'

import { BrowserRouter as Router, Route } from "react-router-dom";
const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class ButtonAppBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props;
        return (
            <Router>

                <div className={classes.root}>
                    <AppBar position="static">
                        {/* <SideMenu /> */}
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <SideMenu />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                News
                        </Typography>
                            {true ? <Link exact to='/profile/dashboard/K9DwEyp0KRUxofHRaVh17OViU9w2/meeting'><Button style={{ color: 'white', textDecoration: 'underline' }}>Log Out</Button></Link> : <Link exact to='/'><Button color="inherit">Log In</Button></Link>}
                        </Toolbar>
                    </AppBar>
                </div >

            </Router>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);