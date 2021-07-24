import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import BackToMenu from '../../assets/gamepage/backToMenuWhite.png'
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.background.main
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function NavBar() {
    const classes = useStyles();

    return (
        //Find correct way to set app bar color using themes
        <AppBar className={classes.root} position="static" color="primary" >
            <Toolbar >
                <Link to='/main'>
                    <img src={BackToMenu} alt={"Back to Menu"} />
                </Link>
            </Toolbar>
        </AppBar>
    );
}
