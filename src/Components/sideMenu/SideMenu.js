import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MeetingIcon from '@material-ui/icons/Assignment';
import Ring from '@material-ui/icons/RingVolume';


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';
import logo from '../../logo.svg';

import "./style.css";

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 80,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
};

class SwipeableTemporaryDrawer extends React.Component {
    state = {
        left: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>

                <CardActionArea>
                    <Avatar alt="Remy Sharp" src={logo} className="sideBar_avatar" />
                    <CardMedia
                        className={classes.media}
                        image=""
                        title=""
                    />
                    <CardContent>
                        <Typography component="p" className="user_nickName">
                            Muhammad Usama
                            </Typography>

                        <Typography component="p" className="user_email">
                            abc@gmail.com
                            </Typography>
                    </CardContent>
                </CardActionArea>




                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <MeetingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Meetings" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <Ring />
                        </ListItemIcon>
                        <ListItemText primary="Request" />
                    </ListItem>
                </List>
            </div>
        );

        const fullList = (
            <div className={classes.fullList}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <div>
                <MenuIcon onClick={this.toggleDrawer('left', true)}>

                </MenuIcon>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

SwipeableTemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);