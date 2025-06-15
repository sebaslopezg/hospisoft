import React, { useRef, useEffect } from 'react';
import { Box, Card, Typography, Paper, Stack, CardContent, IconButton, Grid, CardMedia } from '@mui/material';
import MenuLanding from './components/menuLanding';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import LandingTheme from './LandingTheme';
import { motion, useScroll, useTransform, useInView  } from 'framer-motion';
import bg1 from './assets/img/main.png'
import img2 from './assets/img/img2.jpg'
import pattern1 from './assets/svg/pattern1.svg'
import ReactLenis from 'lenis/dist/lenis-react'
import HealingIcon from '@mui/icons-material/Healing';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const SECTION_HEIGHT = 1500

export const LandingLayout=()=>{
    const lenisRef = useRef(null);
    useEffect(() => {
  lenisRef.current = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenisRef.current?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => {
    lenisRef.current?.destroy();
  };
}, []);
    const handleScrollTo = (target) => {
    if (lenisRef.current) {
    lenisRef.current.scrollTo(target);
    }
    };
    return (<>
    <ReactRouterAppProvider theme={LandingTheme}>
    <MenuLanding handleScrollTo={handleScrollTo}/>
    <ReactLenis root>
    <Hero/>
    <About/>
    <Servicios/>
    <Contactanos/>
    </ReactLenis>
    </ReactRouterAppProvider>
    </>)
}

const Hero = ()=>{
    return(
    <div style={{
        position:'relative',
        minWidth:'100%'
        }}
    >
        <MainSection/>
    </div>
    )
}

const MainSection = ()=>{
    const { scrollY, scrollX } =  useScroll()
    const opacity = useTransform(
        scrollY, 
        [scrollX, scrollX + 100], 
        [1, 0]
    )

    const backgroundSize = useTransform(
        scrollY, 
        [0, SECTION_HEIGHT + 500], 
        ["170%", "100%"]
    )

    return (
    <motion.div id='main'
    style={{
        opacity,
        background:`url(${bg1})`,
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        height:'100vh',
        position:'sticky',
        top:'0',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        paddingBottom:'10rem',
        paddingLeft:'3rem'
    }}>
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-start',
        }}
        >
        <TextFade direction='up' staggerChildren={0.5} className="text-fade-wrapper">
                <Typography variant='h3' sx={{fontWeight:'bold', color:'#6fdcff'}}>Bienvenido a HospiSoft!</Typography>
                <Typography variant='h4' sx={{color:'white'}}>Excelencia médica con calidad humana</Typography>
                <Box sx={{width:'60%', color:'white'}}>
                    <Typography variant='h6'>Somos un servicio de medicina que cuenta con profesionales dispuestos a brindarte el mejor trato posible</Typography>
                </Box>
        </TextFade>
    </Box>
    </motion.div>
    )
}

export function TextFade({
  direction,
  children,
  className = '',
  staggerChildren,
}){
  const FADE_DOWN = {
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
    hidden: { opacity: 0, y: direction === 'down' ? -18 : 18 },
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : ''}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_DOWN}>{child}</motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
}

const About = ()=>{
    return (    
        <motion.div id='about'
        style={{
        backgroundColor:'white',
        height:'100vh',
        position:'relative',
        top:'0',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        paddingBottom:'10rem',
        paddingRight:'2rem'
    }}>
        <Stack
            direction="row"
            spacing={2}
            sx={{
                minHeight:'100%',
                justifyContent: "flex-start",
                alignItems: "center",
            }}
>
    <Card 
    sx={{
        background:`url(${img2})`,
        minWidth:'50%',
        minHeight:'100%',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
        }}>
    </Card>
    <Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "flex-start",
  }}
>
    <Typography variant='h3' sx={{fontWeight:'bold', color:'#223F85'}}>Acerca de nosotros</Typography>
    <Typography variant='h5'>Esta es una descripción muy descriptiva con el fin de describir lo que se está describiendo de manera describiente</Typography>
    <Stack
        direction="row"
        spacing={2}
        sx={{
            mb:'5',
            justifyContent: "center",
            alignItems: "center",
            }}
    >
        <IconButton>
            <HealingIcon sx={{fontSize:'100%', color:'#6FDCFF'}}/>
        </IconButton>
        <Typography variant='h6'>Nos gusta curar a la gente!</Typography>
    </Stack>
        <Stack
        direction="row"
        spacing={2}
        sx={{
            justifyContent: "center",
            alignItems: "center",
            }}
    >
        <IconButton>
            <LocalHospitalIcon sx={{fontSize:'100%', color:'#6FDCFF'}}/>
        </IconButton>
        <Typography variant='h6'>Tenemos cajas con cruces</Typography>
    </Stack>
        <Stack
        direction="row"
        spacing={2}
        sx={{
            justifyContent: "center",
            alignItems: "center",
            }}
    >
        <IconButton>
            <FitnessCenterIcon sx={{fontSize:'100%', color:'#6FDCFF'}}/>
        </IconButton>
        <Typography variant='h6'>Inventamos un nuevo deporte es como basketball pero en vez de usar un balón usamos pesas de 100%kg/h</Typography>
    </Stack>
    <Typography variant='h6'>Por esos días Mastropiero enfrentó grandes problemas: chocó con la bici… con las vicisitudes más adversas ¿que le tocaron?… ji, ji, ji… que le tocaron en suerte. Vivía acostado por las dudas… vivía acosado por las deudas. Por esos tiempos conoció a los condes de Freistadt, y cuando ya no podía más sacudió a la condesa… </Typography>
  </Stack>
</Stack>

</motion.div>
)
}

const Servicios = ()=>{
        const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
    return(
        <motion.div id='servicios'
        style={{
        background: 'rgba(134, 220, 255, 0.7)',
        boxShadow:'0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter:'blur(9.7px)',
        WebkitBackdropFilter:'blur(9.7px)',
        border:'1px solid rgba(134, 220, 255, 0.78)',
        height:'100vh',
        position:'relative',
        top:'0',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        paddingBottom:'10rem',
    }}>
<Box sx={{margin:"2rem"}}>
    <Typography variant='h2' sx={{fontWeight:'bold', color:'#223F85'}}>Nuestros servicios</Typography>
    <Carousel
    swipeable={true}
    draggable={false}
    showDots={true}
    responsive={responsive}
    ssr={true} // means to render carousel on server-side.
    infinite={true}
    autoPlaySpeed={1000}
    keyBoardControl={true}
    containerClass="carousel-container"
    removeArrowOnDeviceType={["tablet", "mobile"]}
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
    >
            <Grid>
                
                <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={`${img2}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Nombre
                    </Typography>
                    <Typography variant="body2" sx={{wordBreak:'break-word', color: 'text.secondary', display: "inline-block", whiteSpace: "pre-line" }}>
                        Descripcion
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
                        <Grid>
                <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={`${img2}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Nombre
                    </Typography>
                    <Typography variant="body2" sx={{wordBreak:'break-word', color: 'text.secondary', display: "inline-block", whiteSpace: "pre-line" }}>
                        Descripcion
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
            <Grid>
                <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={`${img2}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Nombre
                    </Typography>
                    <Typography variant="body2" sx={{wordBreak:'break-word', color: 'text.secondary', display: "inline-block", whiteSpace: "pre-line" }}>
                        Descripcion
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
            <Grid>
                <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={`${img2}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Nombre
                    </Typography>
                    <Typography variant="body2" sx={{wordBreak:'break-word', color: 'text.secondary', display: "inline-block", whiteSpace: "pre-line" }}>
                        Descripcion
                    </Typography>
                </CardContent>
                </Card>
            </Grid>
    </Carousel>
</Box>
    </motion.div>
    )
}

const Contactanos = ()=>{
    return(
    <motion.div id='contactanos'
        style={{
            backgroundColor:'white',
            height:'50vh',
            position:'sticky',
            top:'0',
            width:'100%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-end',
            paddingBottom:'10rem',
            paddingLeft:'3rem'
        }}>
            <Typography>Telefonos y mucho más</Typography>
    </motion.div>
    )
}

export default LandingLayout