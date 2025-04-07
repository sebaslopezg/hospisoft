import { Medicamentos } from "./medicamentos/medicamentos";
import { Users } from "./users/Users";

const pageContent = {
    usuarios:<><Users /></>,
    medicamentos:<>< Medicamentos /></>
}

const RenderLayout = (renderName) => {
    
    let rutaRaw = renderName.renderName.pathname
    let ruta = rutaRaw.substring(1)
    console.log(ruta)

    return pageContent[ruta]
}

export const LayoutManager = (pathname) => {
    return <>
        <RenderLayout renderName={pathname}/>
    </>;
}