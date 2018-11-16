import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


//DatePicker
import DateTimePicker from 'react-datetime-picker';

class AlertDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.dialogBoxOpen,
            date: new Date()
        }
        this.onChange = this.onChange.bind(this)
    }

    handleClickOpen = () => {
        this.props.handleDialogOpen()
    };

    handleClose = () => {
        this.props.handleDialogClose()
    };

    onChange = date => {
        this.setState({ date })
    }

    render() {
        const { usersInfo } = this.props
        return (
            <div className="dialogDiv1">
                <Button onClick={this.handleClickOpen}>Open alert dialog</Button>
                <Dialog
                    className="dialogDiv2"
                    open={this.props.dialogBoxOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-title">{"Please Select Respective Date and Time"}</DialogTitle>
                    <DialogContent className="dialogDiv">
                        <DialogContentText id="alert-dialog-description">
                            <DateTimePicker
                                onChange={this.onChange}
                                value={this.state.date}
                                calendarClassName="clan"
                            />
                            <br />
                            Let your {usersInfo.displayName} Know When Do You Want To Meet Him.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;