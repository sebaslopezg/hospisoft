import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const Theme = createTheme({
    palette: {
        mode: 'light',
        primary:{
            main:'#3f51b5',
            light: '#7986cb',
            dark: '#303f9f',
        },
        secondary:{
            main:'#7b2cbf',
            light: '#e0aaff',
            dark: '#10002b',
        },
        background: {
          default: '#F9F9FE',
          paper: '#E6E6F5',
          }
    },
    components:{
        MuiCssBaseline:{
            styleOverrides:{
                body:{
                    background: '#f2f4ff',
                }
            }
        },
        MuiButton:{
            defaultProps:{
                disableRipple: true,
            },
            styleOverrides:{
                root:{
                    borderRadius:'15px',
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
                    background: '#c5c5eb',
                    background: 'linear-gradient(90deg,rgba(197, 197, 235, 1) 0%, rgba(142, 150, 195, 1) 100%)',
                    borderBottomWidth:'0 !important',
                }
            },
            defaultProps:{
                color:'primary.main',
                
            }
        },
        MuiPaper:{
            styleOverrides:{
                root:{
                    borderRight:'0 !important',
                    boxShadow:'2px 4px 10px -3px rgba(0, 21, 62, 0.27)',
                }
            }
        },
        MuiDrawer:{
            styleOverrides:{
                root:{
                    borderRight:'0 !important'
                }
            }
        },
        MuiCard:{
            styleOverrides:{
                root:{
                    padding:'2%',
                    borderRadius:'15px'
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
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
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
                       backgroundColor:'rgba(68, 89, 147, 0.1)'
                    }
                }
            }
        }
    }, 
})

export default Theme
