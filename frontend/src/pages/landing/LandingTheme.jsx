import { createTheme } from "@mui/material";

const LandingTheme = createTheme({
        palette: {
        mode: 'light',
        primary:{
            main:'#2B74DF',
            light: '#36A8E5',
            dark: '#2055d6',
        },
        secondary:{
            main:'#7b2cbf',
            light: '#e0aaff',
            dark: '#10002b',
        },
        grey:{
            main: '#b0bec5',
            light: '#78909c',
            dark: '#78909c'
        },
    },
    components:{
        MuiAppBar:{
            styleOverrides:{
                root:{
                        background: 'rgba(51, 139, 175, 0.49)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(7.2px)',
                        WebkitBackdropFilter: 'blur(7.2px)',
                        border: '1px solid rgba(51, 139, 175, 0.37)',
                        zIndex: '50',
                        position:'fixed'
                }
            }
        }
    }
})

export default LandingTheme