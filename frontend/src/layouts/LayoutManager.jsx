import Container from '@mui/material/Container';
import { Medicamentos } from "./medicamentos/medicamentos";
import { Users } from "./users/Users";
import { Home } from "./home/home";

const pageContent = {
    usuarios:<><Users /></>,
    medicamentos:<>< Medicamentos /></>,
    home:<><Home/></>
}

const RenderLayout = (renderName) => {
    
    let rutaRaw = renderName.renderName.pathname
    let ruta = rutaRaw.substring(1)
    console.log(ruta)

    return pageContent[ruta]
}

export const LayoutManager = (pathname) => {
    return <>
    <Container maxWidth="xl">
        <RenderLayout renderName={pathname}/>
    </Container>

    </>;
}