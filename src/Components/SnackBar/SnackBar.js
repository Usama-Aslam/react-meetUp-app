import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

class DirectionSnackbar extends React.Component {
    state = {
        open: false,
        Transition: null,
    };

    handleClick = Transition => () => {
        this.setState({ open: true, Transition });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClick(TransitionDown)}>Down</Button>
                <Snackbar
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={this.state.Transition}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<div id="message-id">

                    </div>}
                />
            </div>
        );
    }
}

export default DirectionSnackbar;