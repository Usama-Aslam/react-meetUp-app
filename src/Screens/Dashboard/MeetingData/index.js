import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
// import setMeeting from '../../'

// //redux
// import { connect } from "react-redux"
// import { updateUser } from "../../../Redux/Action/authAction"

import { firebase } from '../../../Config/firebase'

class MeetingData extends Component {
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

export default MeetingData

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
