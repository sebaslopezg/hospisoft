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
        grey:{
            main: '#b0bec5',
            light: '#78909c',
            dark: '#78909c'
        },
        background: {
          default: '#F9F9FE',
          paper: '#f2f4ff',
          
          }
    },
    components:{
        MuiCssBaseline:{
            styleOverrides:{
                body:{

                    background: '#E6E6F5'
                }
            }
        },
        MuiButton:{
            defaultProps:{
                variant:'contained'
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
                    background: 'linear-gradient(90deg,rgb(147, 159, 226) 0%, rgb(106, 80, 179) 100%)',
                    //borderBottomWidth:'0 !important',
                }
            },
            defaultProps:{
                color:'primary.main',
                
            }
        },
        MuiPaper:{
            styleOverrides:{
                root:{
                    //borderRight:'0 !important',
                    boxShadow:'2px 4px 10px -3px rgba(0, 21, 62, 0.27)',
                }
            }
        },
        MuiDrawer:{
            styleOverrides:{
                paper:{
                    backgroundColor: 'rgba(88, 118, 204, 0.3)'
                },
                root:{
                    // borderRight:'0 !important',
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
        },
        MuiSelect:{

            styleOverrides:{
                root:{
                    color: "#000",
                    backgroundColor: "#FAFAFF",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
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
    }, 
})

export default Theme
