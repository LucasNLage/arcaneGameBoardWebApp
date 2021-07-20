import { createMuiTheme } from '@material-ui/core/styles';

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#B58863',
        },
        secondary: {
            main: '#F0D9B5',
        },
        background: {
            main: '#F0D9B5',
            secondary: "#B58863",
            gradient: 'radial-gradient(circle, rgba(77,33,122,1) 0%, rgba(77,33,122,1) 41%, rgba(27,21,52,1) 100%)',
        },
        action: {
            hover: '#585568',
            selected: '#6F6B84'
        }
    },
});

export default theme;