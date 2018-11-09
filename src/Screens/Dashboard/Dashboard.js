import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu.js"

//redux
import { connect } from "react-redux"
import { updateUser } from "../../Redux/Action/authAction"

class Dashboard extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <DashboardMenu />
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
