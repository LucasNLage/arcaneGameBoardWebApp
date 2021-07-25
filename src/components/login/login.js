import React, { useState } from "react"
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import logo from '../../assets/title/ArcaneGamesTitleWhite.png'
// import { login } from "../../redux/actions.js";
import { connect } from "react-redux";


export default function Login(props) {
    // The state for userName to keep track of what the value is in the userName textfield
    const [username, setUsername] = useState("");
    // The state for password to keep track of what the value is in the password textfield
    const [password, setPassword] = useState("");
    // The state to keep track if a login atempt was bad to show an error message
    const [errorLogin, setErrorLogin] = useState(false);
    // Need the history variable to re-direct to the dashboard if the login is successful
    let history = useHistory();

    const users = {
        Anton: { id: 1, password: "Anton" },
        Fernando: { id: 1, password: "Fernando" },
        Lucas: { id: 1, password: "Lucas" },
        Kayla: { id: 1, password: "Kayla" },
        Test1: { id: 1, password: "Test1" },
        Test2: { id: 1, password: "Test2" },
    }

    console.log("Redux:", props)
    console.log("\nredux with no this:", props)

    console.log("\nredux users with no this:", users)

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
            background: "rgba(239,239,239,.1)",
            marginTop: theme.spacing(2)
        },
        button: {
            background: 'rgba(27,21,52,.5)',
            width: "100",
        },
        media: {
            width: '90%',
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


    function handleLogin() {

        // Checks if users are in user hashmap 
        if (users[username]) {
            if (users[username].password === password) {
                history.push("/main");
            }
            else {
                setErrorLogin(true)
            }
        }
        else {
            setErrorLogin(true)
        }
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
                        {/* Box is used to center items on card */}
                        <Box my={8}>
                        </Box>
                        {/* A box allows us to add spacing around our textfields, in this case margin spacing top and bottom */}
                        <Box my={2}>
                            <TextField id="username" label={"Username"} fullWidth
                                className={classes.borderColor}
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                InputProps={{ className: classes.inputField }}
                                InputLabelProps={{ className: classes.labelField }} />
                        </Box>
                        <Box my={2}>
                            <TextField id="password" label={"Password"} fullWidth
                                className={classes.borderColor} type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                InputProps={{ className: classes.inputField }}
                                InputLabelProps={{ className: classes.labelField }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") { handleLogin() }
                                }} />
                        </Box>
                        <Box my={2}>
                            <Button className={classes.button} variant="contained" color="primary" fullWidth
                                onClick={handleLogin}>
                                Login
                            </Button>
                            <Grid container >
                                <Grid item xs >
                                    {errorLogin ? <Alert className={classes.errorMessage} variant="outlined" severity="warning">Username/Password combination does not exist. Please try again!</Alert> : null}
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

// Mapping the redux state to our props, so our component can access the redeux
// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: state.session.logged
//   }
// }
