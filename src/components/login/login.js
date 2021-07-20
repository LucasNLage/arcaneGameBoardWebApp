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
// import { connect } from "react-redux";


export default function Login(props) {
    // The state for email to keep track of what the value is in the email textfield
    const [email, setEmail] = useState("");
    // The state for password to keep track of what the value is in the password textfield
    const [password, setPassword] = useState("");
    // The state to keep track if a login atempt was bad to show an error message
    const [errorLogin, setErrorLogin] = useState(false);
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


    function handleLogin() {
        history.push("/main");
    }


    // function handleLogin() {

    // // Post Http request using our email and password state as the body message
    // axios.post('/login/', {
    //   email: email,
    //   password: password
    // })
    // .then(function (response) {
    //   // If we get a "OK" status then we have successfully got the access_token
    //   console.log("response in login:", response);
    //   if (response.status === 200) {
    //     if (response.data) {
    //       // Call the login function from our redux actions
    //       // This loads the data we get into our redux state to be used by other components in our application
    //       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    //       props.loginAction(
    //         response.data.id, response.data.email,
    //         response.data.access, response.data.refresh_token, 
    //         response.data.expires_in, response.data.timestamp
    //       );
    //     }
    //     // Setup the global authorization headers to use the bearer token we ere given upon logging in
    //     // Re-direct our page to /dashboard since we sucessfully logged into the application
    //     history.push("/dashboard");
    //   }
    // })
    // // Handle an error response from the server (our login request did not work)
    // .catch(function (error) {
    //   // Set the error login state to true to show to the user our error message
    //   setErrorLogin(true);
    //   if (!error.response) {
    //     console.error("Error has no reponse:", error);
    //     return;
    //   }
    //   // Print the error to console to see what the problem was with our request
    //   // TODO: take this console logs out to not show to our front end console for production builds
    //   if (error.response.status && error.response.status === 400) {
    //     console.error("Login Error 400:\n", error);
    //   } else {
    //     console.error("Login Error:\n", error);
    //   }
    // });
    // }


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
                        {/* A box allows us to add spacing around our textfields, in this case margin spacing top and bottom */}
                        <Box my={2}>
                            <TextField id="email" label={"Username"} fullWidth
                                className={classes.borderColor}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
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
                            <Grid container>
                                <Grid item xs>
                                    {errorLogin ? <Alert className={classes.errorMessage} variant="outlined" severity="warning">Email/Password combination does not exist. Please try again!</Alert> : null}
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

// // Mapping the login function action to our props
// const mapDispatchToProps = { loginAction: login }

// // Connect the redux to our component so we have access to it through our props
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Login)