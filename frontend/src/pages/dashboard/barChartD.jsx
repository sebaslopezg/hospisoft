import { BarChart } from "@mui/x-charts"
import { cheerfulFiestaPalette } from "@mui/x-charts"
import data from "./data"
import { useEffect, useState } from "react"

export default function BarChartD(){
  const [entregado, setEntregado] = useState(0)
  const [formulado, setFormulado] = useState(0)
  const [dispensario, setDispensario] = useState(0)
      const getData = ()=>{
          const resPacientes = data.getDispensario()
          resPacientes.then((data)=>{
            console.log(data);  
              setEntregado(parseInt(data.data.count.totalEntregado[0].cantidad))
              setFormulado(parseInt(data.data.count.totalFormulado[0].cantidad))
              setDispensario(parseInt(data.data.count.maestro))
          })
      }
      useEffect(()=>{
        getData()
      },[])
    return <>
        <BarChart
        colors={cheerfulFiestaPalette}
      series={[
        { data: [formulado], label: ['formulado'] },
        { data: [entregado], label: ['entregado'] },
        { data: [dispensario], label: ['dispensado'] },
      ]}
      height={290}
      xAxis={[{ data: ['Órdenes creadas'] }]}
    />
    </>
}