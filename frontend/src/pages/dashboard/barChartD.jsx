import { BarChart } from "@mui/x-charts"
import { cheerfulFiestaPalette } from "@mui/x-charts"
import data from "./data"
import { useEffect, useState } from "react"

export default function BarChartD(){
  const [dispensario, setDispensario] = useState([])
  const [formula, setFormula] = useState([])
      const getData = ()=>{
          const resPacientes = data.getDispensario()
          resPacientes.then((data)=>{
            console.log(data);
            
              setDispensario(parseInt(data.data.count.totalEntregado.cantidad))
              setFormula(parseInt(data.data.count.totalFormulado.cantidad))
          })
      }
      useEffect(()=>{
        getData()
      },[])
    return <>
        <BarChart
        colors={cheerfulFiestaPalette}
      series={[
        { data: dispensario },
        { data: formula },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
    />
    </>
}