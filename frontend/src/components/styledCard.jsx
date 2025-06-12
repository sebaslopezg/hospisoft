import { createTheme, ThemeProvider, Card, Typography } from "@mui/material"

const imgURL = '../../src/assets/svg/'

const ThemeCard = createTheme({
    components:{
        MuiCard:{
            styleOverrides:{
                root:{
                    minWidth:'33%',
                    minHeight:'100%',
                    backgroundRepeat:'no-repeat',
                    backgroundSize:'cover',
                    borderRadius:'15px',
                }
            }
        },
    }
})

export default function StyledCard({svgVariation, title, content}){
    return <>
    <ThemeProvider theme={ThemeCard}>
    <Card 
    sx={{
        backgroundImage:`url(${imgURL}${svgVariation})`
    }}>
        <Typography variant='h5' sx={{mt:3, ml:3, color:'white'}}>{title}</Typography>
        <Typography variant='h3' sx={{mt:3, ml:3, color:'white'}}>{content}</Typography>
    </Card>
    </ThemeProvider>
    </>
}