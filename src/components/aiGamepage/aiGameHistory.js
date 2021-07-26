import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { connect } from "react-redux"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        maxHeight: 700,
        overflow: "auto",
        // position: "relative"
    },
}));


function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export function AIGameHistory(props) {
    const classes = useStyles();

    console.log("props in ai gamehistory:", props)

    function renderMoves(history) {


        return (history.map((move, index) => {
            return (
                <ListItem key={index}>
                    {/* <ListItemIcon>
                        <FiberManualRecordIcon fontSize="small" />
                    </ListItemIcon> */}
                    <ListItemText fontSize="small" primary={`Move ${index + 1} - ${move.color}${move.piece} from ${move.from} to ${move.to}`} />
                </ListItem>
            )
        })

        );
    }


    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                {props && props.history && props.history.length > 0 ? renderMoves(props.history) : <ListItem button><ListItemText primary="No Moves have been made" /></ListItem>}
            </List>
        </div>
    );
}




const mapStateToProps = (state) => {
    return {
        history: state.history
    }
}

export default connect(
    mapStateToProps,
    null
)(AIGameHistory)

