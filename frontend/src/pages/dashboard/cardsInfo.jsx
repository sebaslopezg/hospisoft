import { createTheme, Stack } from '@mui/material';
import StyledCard from '../../components/styledCard';
import { useEffect, useState } from 'react';
import data from './data';

export default function CardsInfo(){

    const [pacientes, setPacientes] = useState(0)
    const [formulas, setFormulas] = useState(0)
    const [examenes, setExamenes] = useState(0)

    const getData = ()=>{
        const resPacientes = data.getPacientes()
        resPacientes.then((data)=>{
            setPacientes(data.data.count.active)
        })

        const resFormulas = data.getFormulas()
        resFormulas.then((data)=>{
            setFormulas(data.data.count.active)
        })

        const resExamenes = data.getExamenes()
        resExamenes.then((data)=>{
            setExamenes(data.data.count.active)
        })
    }

    useEffect(() =>{
        getData()
    },[])

    return<>
    <Stack
    direction="row"
    spacing={1}
    sx={{
        mb:2,
        justifyContent: "center",
        alignItems: "center",
        minHeight:"20%",
    }}
    >
        <StyledCard 
        svgVariation='CardColor1.svg'
        title='Numero de Pacientes:'
        content={pacientes}
        />
        <StyledCard 
        svgVariation='CardColor2.svg'
        title='Formulas creadas:'
        content={formulas}
        />
        <StyledCard 
        svgVariation='CardColor3.svg'
        title='Examenes asignados:'
        content={examenes}
        />
    </Stack>
    
    </>
}