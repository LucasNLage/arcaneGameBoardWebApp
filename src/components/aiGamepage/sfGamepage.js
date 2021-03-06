import React, { useState } from "react"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "../navbar/navbar.js"
import SFChessBoard from './sfChessboard.js'
import AIGameHistory from './aiGameHistory.js'
import { connect } from "react-redux"

export function SFGamePage(props) {

    // State used to keep track of game history
    const [gameHistory, setGameHistory] = useState();

    // General css styles used for the component
    const useStyles = makeStyles((theme) => ({
        gamePaper: {
            height: '100vh',
            backgroundColor: theme.palette.background.main
        },
        historyPaper: {
            height: '100vh',
            backgroundColor: "#FFFFFF",
            border: "1px solid"
        },
        historyTitle: {
            marginTop: theme.spacing(2)
        },
        historyBox: {
            textAlign: "center",
            marginTop: theme.spacing(2)
        },
        gameBox: {
            height: '100vh',
            justifyContent: "center",
            alignItems: 'center',
            textAlign: "center",
            marginTop: theme.spacing(20)
        }
    }));
    const classes = useStyles();

    const boardsContainer = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100vw",
        marginTop: 30,
        marginBottom: 50
    };

    console.log("Props AI Gamepage:", props)

    // A grid is almost like a box, where we are putting smaller components inside to be treated as one unit
    // This allows use to center the grid and all the components will be centered as well since its one unit
    return (
        <Grid container >
            <Grid item xs={12} >
                <NavBar clearHistory={props.HistoryPost} />
            </Grid>
            <Grid item xs={12} sm={8} >
                <Paper className={classes.gamePaper} elevation={0} varient="outlined" square>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                    >
                        <Grid item>
                            <Box className={classes.gameBox}>
                                <SFChessBoard updateHistory={props.HistoryUpdate} />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Hidden xsDown>
                <Grid item xs={4}>
                    <Paper className={classes.historyPaper} elevation={0} varient="outlined" square>
                        <Box className={classes.historyBox}>
                            <Typography variant="h5" gutterBottom >
                                Game History
                            </Typography>
                        </Box>
                        <Box className={classes.historyList}>
                            <AIGameHistory />
                        </Box>
                    </Paper>
                </Grid>
            </Hidden>
        </Grid >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        HistoryPost: (history) => { dispatch({ type: "CLEAR_HISTORY", history: history }) },
        HistoryUpdate: (history) => { dispatch({ type: "UPDATE_HISTORY", history: history }) }

    }
}

export default connect(
    null,
    mapDispatchToProps
)(SFGamePage)
