import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu.js"

//redux
import { connect } from "react-redux"
import { updateUser } from "../../Redux/Action/authAction"

//appbar
import AppBar from '../../Components/appBar/AppBar'

class Dashboard extends Component {
    constructor() {
        super();
    }

    render() {
        //we are sending route props and other props to dashboard menu. meeting and request
        return (
            <div>
                {/* <AppBar {...this.props}/> */}
                <DashboardMenu {...this.props} />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    console.log("state from component", state)
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user))
    }
}
// export default Login
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
