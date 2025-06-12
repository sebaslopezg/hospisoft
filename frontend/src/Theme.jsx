import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const Theme = createTheme({
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
        background: {
          default: '#F5F6F9',
          paper: '#FFFFFF',
          
          }
    },
    components:{
        MuiCssBaseline:{
            styleOverrides:{
                body:{

                    background: '#F5F6F9'
                }
            }
        },
        MuiButton:{
            defaultProps:{
                variant:'contained'
            },
            styleOverrides:{
                root:{
                    borderRadius:'10px',
                    display:'inline-block',
                    cursor:'poiner',
                    padding: '10px 12px',
                    textShadow: '0px 1px 3px rgba(0, 0, 0, 0.35)'
                }
            }
        },
        MuiAppBar:{
            styleOverrides:{
                root:{
                    background: '#FFFFFF',
                    //borderBottomWidth:'0 !important',
                }
            },
            defaultProps:{
                color:'primary.main',
                
            }
        },
        MuiPaper: {
            styleOverrides: { root: { backgroundImage: 'unset' } },
        },
        MuiDrawer:{
            styleOverrides:{
                paper:{
                    background: 'linear-gradient(160deg,rgba(69, 187, 237, 1) 0%, rgba(35, 93, 219, 1) 100%) !important',
                    color: '#fff',
                    '& .MuiSvgIcon-root': {
                    color: 'rgb(0, 4, 126)',    
                    }  
                }
            }
        },
        MuiCard:{
            styleOverrides:{
                root:{
                    padding:'2%',
                    borderRadius:'10px'
                }
            }
        },
        MuiTextField:{
            
            defaultProps:{
                variant:'filled',
                margin:'dense',
            },
            styleOverrides:{
                root:{
                    
            "& .MuiFilledInput-root": {
                color: "#000",
                backgroundColor: "#FAFAFF",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                boxShadow:'0 -4px 10px -3px rgba(0, 21, 62, 0.27)',
            "&:before": {
              borderColor: "#ABB2D1",
            },
            ":hover:not(.Mui-focused)": {
              "&:before": {
                borderColor: "#7986cb",
              },
              backgroundColor: "#E9EBF7",
            },
            "&.Mui-focused": {
              backgroundColor: "#DADEF2",
            },
          },
          "& .MuiInputLabel-filled": {
            color: "#2e2e2e",
            "&.Mui-focused": {
              color: "secondary.main",
            },
          },
                }
            }
        },
        MuiInputBase:{
            styleOverrides:{
                root:{
                    backgroundColor: '#FFFFFF'
                }
            }
        },
        MuiListItem:{
            styleOverrides:{
                root:{
                    marginBottom:'5px'
                }
            }
        },
        MuiListItemButton:{
            styleOverrides:{
                root:{
                    ":hover:not(.Mui-focused)": {
                        backgroundColor:'rgba(145, 221, 244, 0.48)'
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#F5F6F9",
                    },
                }
            }
        },
        MuiSelect:{

            styleOverrides:{
                root:{
                    color: "#000",
                    backgroundColor: "#FAFAFF",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    boxShadow:'0 -4px 10px -3px rgba(0, 21, 62, 0.27)',
                    ":hover:not(.Mui-focused)": {
                    "&:before": {
                    borderColor: "#7986cb",
                    },
                    backgroundColor: "#E9EBF7"
                    },
                }
            },
            defaultProps:{
                variant:'filled',
                margin:'dense',
            }
        },
        MuiAccordion:{
            defaultProps:{
                disableGutters:'true',
            },
            styleOverrides:{
                paper:{
                    backgroundColor:'F5F6F9',
                },
                root:{
                    borderRadius: '10px',
                    marginTop:'3%',
                    '&:before':{
                        display:'none'
                    }
                }
            }
        }
    }, 
})

export default Theme
