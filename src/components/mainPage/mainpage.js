import React from "react"
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import logo from '../../assets/title/ArcaneGamesTitleWhite.png'
// import { login } from "../../redux/actions.js";
// import { connect } from "react-redux";


export default function MainPage(props) {
    // Need the history variable to re-direct to the dashboard if the login is successful
    let history = useHistory();

    // General css styles used for the component
    const useStyles = makeStyles((theme) => ({
        card: {
            maxWidth: 375,
            minHeight: 600,
            maxHeight: 815,
            padding: theme.spacing(2),
            background: theme.palette.primary.main
        },
        centeredContent: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: theme.palette.background.main
        },
        labelField: {
            color: 'white !important'
        },
        errorMessage: {
            color: 'white',
            background: "rgba(239,239,239,.1)"
        },
        button: {
            background: 'rgba(27,21,52,.5)',
            width: "100",
        },
        media: {
            width: '70%',
            alignItems: "center",
            margin: "auto"
        },
        inputField: {
            color: 'white !important',
            '&:before': {
                borderBottom: '1px solid white !important'
            },
            '&:after': {
                borderBottom: `1px solid white !important`
            },
            '&:hover': {
                borderBottom: `1px solid white !important`
            }
        }
    }));
    const classes = useStyles();

    function handlePlayerGame() {
        history.push("/gamepage");
    }

    function handleAiGame() {
        history.push("/aigamepage");
    }


    // A grid is almost like a box, where we are putting smaller components inside to be treated as one unit
    // This allows use to center the grid and all the components will be centered as well since its one unit
    return (
        <Grid container spacing={0} className={classes.centeredContent}>
            {/* This is treated as one single item in our grid (container) */}
            <Grid item>
                {/* A card is a styled container with spacing arounds its inner components */}
                <Card className={classes.card}>
                    <CardContent>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            image={logo}
                        />
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center">
                            <Box my={2}>
                                <Button className={classes.button} variant="contained" color="primary" fullWidth
                                    onClick={handlePlayerGame}>
                                    Player vs Player
                                </Button>
                            </Box>
                            <Box my={2}>
                                <Button className={classes.button} variant="contained" color="primary" fullWidth
                                    onClick={handleAiGame}>
                                    Player vs. Computer (Coming soon)
                                </Button>
                            </Box>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
