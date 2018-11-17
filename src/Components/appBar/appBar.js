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

//firebase
import { firebase, checkAuth, firebaseLogout, firebaseFacebookLogin } from '../../Config/firebase'

//redux
import { connect } from 'react-redux'
import { updateUser, removeUser } from '../../Redux/Action/authAction'


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
        this.state = {
            user: null
        }
        // checkAuth()
        //     .then((check) => {
        //         check ? this.setState({ cr: true }) : this.setState({ cr: false })
        //     })
    }

    componentWillMount() {
        this.checkUser()
    }

    checkUser = () => {
        let a = checkAuth()
        console.log("fdf", a)
    }

    render() {
        const { classes, user } = this.props;
        console.log("app bar props", this.props)
        console.log("appBar users auth", this.state.cr)
        return (
            <Router>
                <div className={classes.root}>
                    <AppBar position="static">
                        {/* <SideMenu /> */}
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                {/* <MenuIcon /> */}
                                {user ? <SideMenu {...this.props} /> : null}
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                MEET UP
                        </Typography>
                            {user ?
                                <Link exact to="/"> <Button style={{ color: 'white', textDecoration: 'underline' }} onClick={() => {
                                    firebaseLogout()
                                        .then(() => {
                                            this.props.removeUser()
                                            this.props.history.replace('/')
                                        })
                                }}>Log Out</Button></Link>
                                : <Link exact to='/'><Button color="inherit" style={{ color: 'white', textDecoration: 'underline' }} onClick={
                                    () => firebaseFacebookLogin(this.props)
                                }>Log In</Button></Link>}
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

// export default withStyles(styles)(ButtonAppBar);

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user)),
        removeUser: () => dispatch(removeUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ButtonAppBar))
