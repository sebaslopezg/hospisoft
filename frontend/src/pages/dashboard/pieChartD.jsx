import { PieChart } from "@mui/x-charts"
import { cheerfulFiestaPalette } from "@mui/x-charts"
import { useState, useEffect } from "react"
import data from "./data"

export default function PieChartD(){
    const [diagnosticos, setDiagnosticos] = useState(0)
    const [formulas, setFormulas] = useState(0)
    const [examenes, setExamenes] = useState(0)

    const getData = ()=>{
        const resPacientes = data.getDiagnosticos()
        resPacientes.then((data)=>{
            setDiagnosticos(parseInt(data.data.count.total))
        })

        const resFormulas = data.getFormulas()
        resFormulas.then((data)=>{
            setFormulas(parseInt(data.data.count.total))
        })

        const resExamenes = data.getExamenes()
        resExamenes.then((data)=>{          
            setExamenes(parseInt(data.data.count.total))
        })
        
        
    }

    useEffect(() =>{
        getData()        
    },[formulas, examenes, diagnosticos])
    
    return <>
    <PieChart
    
    colors={cheerfulFiestaPalette}
    series={[
    {
      data: [
        { id: 0, value: examenes, label: 'Exámenes' },
        { id: 1, value: formulas, label: 'Fórmulas' },
        { id: 2, value: diagnosticos, label: 'Diagnósticos' },
      ],
    },
  ]}
  width={200}
  height={200}
/>
</>
}