import React, { useRef, useEffect } from 'react';
import { Box, Card, Typography, Paper, Stack, CardContent, IconButton, Grid, CardMedia } from '@mui/material';
import MenuLanding from './components/menuLanding';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import LandingTheme from './LandingTheme';
import { motion, useScroll, useTransform, useInView  } from 'framer-motion';
import ReactLenis from 'lenis/dist/lenis-react'
import HealingIcon from '@mui/icons-material/Healing';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Lenis from '@studio-freight/lenis';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import bg1 from './assets/img/main.png'
import img2 from './assets/img/img2.jpg'
import examenes from './assets/img/examenes.jpg'
import citas from './assets/img/citas.jpg'
import diagnosticos from './assets/img/diagnosticos.jpg'
import medicamentos from './assets/img/medicamentos.jpg'
import historial from './assets/img/historial.jpg'

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

const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <MainSection />
    </Box>
  );
};

const MainSection = () => {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ['170%', '100%']);

  return (
    <motion.div
      id="main"
      style={{
        background:`url(${bg1})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        position: 'sticky',
        top: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 'clamp(2rem, 5vw, 10rem)',
        paddingLeft: 'clamp(1rem, 5vw, 3rem)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'flex-start',
          width: { xs: '90%', sm: '80%', md: '60%' },
        }}
      >
        <TextFade direction="up" staggerChildren={0.5} className="text-fade-wrapper">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: '#6fdcff',
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Bienvenido a HospiSoft!
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
            }}
          >
            Excelencia médica con calidad humana
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            }}
          >
            Somos un servicio de medicina que cuenta con profesionales dispuestos a brindarte el mejor trato posible
          </Typography>
        </TextFade>
      </Box>
    </motion.div>
  );
};

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

const About = () => {
  return (
    <motion.div
      id="about"
      style={{
        backgroundColor: 'white',
        width: '100%',
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          minHeight: '100vh',
          alignItems: 'center',
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 4, md: 8 },
        }}
      >
        {/* Left side image */}
 <Grid size={{ xs: 12, md: 6 }}>
  <Box
    sx={{
      width: '100%',
      height: { xs: 250, sm: 400, md: '100%' },
      minHeight: '500px',
      backgroundImage: `url(${img2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: 2,
      boxShadow: 3,
    }}
  />
</Grid>
        <Grid size={{xs:12, md:6}}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                color: '#223F85',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              Acerca de nosotros
            </Typography>

            <Typography
              variant="h6"
              sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}
            >
              Somos una entidad privada de carácter social sin ánimo de lucro con el propósito fundamental de servir, liderar e influir positivamente en el sector de la salud para contribuir al bienestar de individuos y comunidades.
            </Typography>
            {[{
              icon: <HealingIcon sx={{ color: '#6FDCFF' }} />,
              text: 'Prestamos servicios de salud con la más alta calidad y basados en la mejor evidencia disponible.',
            },
            {
              icon: <LocalHospitalIcon sx={{ color: '#6FDCFF' }} />,
              text: 'Brindamos una cultura de servicio que respeta las diferencias, es cercana, cálida y empática con los pacientes, sus familias y colaboradores.',
            },
            {
              icon: <FitnessCenterIcon sx={{ color: '#6FDCFF' }} />,
              text: 'Promovemos hábitos de vida saludables',
            }].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flexWrap: 'no-wrap',
                }}
              >
                <IconButton>{item.icon}</IconButton>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                color: 'text.secondary',
              }}
            >
              Estamos presentes en todas las etapas del continuo del cuidado de la salud entregando resultados superiores de vida y creando una experiencia que va más allá de lo esperado.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  );
};


const Servicios = () => {
    const servicioTexto = [
        {
        title: 'Exámenes médicos',
        content: 'Contamos con un moderno laboratorio clínico y unidades de diagnóstico por imagen para la realización de exámenes médicos de rutina y especializados. Nuestros equipos de última tecnología y personal capacitado aseguran resultados precisos y confiables.',
        image: examenes
        },
        {
        title: 'Citas',
        content: 'Facilitamos la programación de citas médicas de forma presencial, telefónica o en línea, con un amplio grupo de especialistas y horarios flexibles. Nos comprometemos a brindar atención oportuna, respetuosa y centrada en el paciente.',
        image: citas
        },
        {
        title: 'Entrega de medicamentos',
        content: 'Brindamos un servicio eficiente de entrega de medicamentos dentro de nuestras instalaciones, asegurando que los pacientes reciban de manera oportuna los tratamientos prescritos por nuestros profesionales de la salud. Nuestro personal capacitado garantiza una atención ágil, segura y conforme a la normativa vigente.',
        image: medicamentos
        },
        {
        title: 'Diagnósticos',
        content: 'Nuestros médicos especialistas analizan cada caso con rigurosidad, apoyándose en exámenes clínicos, estudios diagnósticos y experiencia médica para brindar diagnósticos certeros que permitan un tratamiento adecuado y personalizado.',
        image: diagnosticos
        },
        {
        title: 'Historia clínica',
        content: 'Ponemos a disposición de nuestros pacientes la entrega de su historia clínica de manera rápida y segura, cumpliendo con los requisitos legales y protocolos de confidencialidad. Este servicio puede solicitarse presencialmente.',
        image: historial
        },
]
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <motion.div
      id="servicios"
      style={{
        background: 'rgba(134, 220, 255, 0.7)',
        backdropFilter: 'blur(9.7px)',
        WebkitBackdropFilter: 'blur(9.7px)',
        border: '1px solid rgba(134, 220, 255, 0.78)',
        width: '100%',
        paddingTop: '4rem',
        paddingBottom: '6rem',
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: '#223F85',
            mb: 4,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          Nuestros servicios
        </Typography>

        <Carousel
          swipeable
          draggable={false}
          showDots
          responsive={responsive}
          ssr
          infinite
          autoPlaySpeed={3000}
          keyBoardControl
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {servicioTexto.map((item, index) => (
            <Box key={index} sx={{ px: 1 }}>
              <Card
                sx={{
                  maxWidth: 345,
                  mx: 'auto',
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt="Servicio"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  >
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </motion.div>
  );
};


const Contactanos = () => {
  return (
    <motion.div
      id="contactanos"
      style={{
        backgroundColor: 'white',
        width: '100%',
        padding: '3rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: '#223F85',
          textAlign: 'center',
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
        }}
      >
        Contáctate con nosotros
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 3, sm: 5 }}
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', maxWidth: 600 }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          <LocalPhoneIcon sx={{ fontSize: 40, color: '#6FDCFF' }} />
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
            +57 345 6778 993
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          <WhatsAppIcon sx={{ fontSize: 40, color: '#6FDCFF' }} />
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
            214 8734 220
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          <EmailIcon sx={{ fontSize: 40, color: '#6FDCFF' }} />
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
            hospisoft@gmail.com
          </Typography>
        </Stack>
      </Stack>
    </motion.div>
  );
};


export default LandingLayout