import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

//redux
// import { connect } from "react-redux"
// import { updateUser } from "../../../Redux/Action/authAction"

import { firebase } from '../../../Config/firebase'

class RequestData extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>

            </div>
        );
    };
}

export default RequestData;
// const mapStateToProps = (state) => {
//     console.log("state from component", state)
//     return {
//         user: state.user
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateUser: (user) => dispatch(updateUser(user))
//     }
// }
// // export default Login
// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
