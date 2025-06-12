import { LineChart } from "@mui/x-charts"
import { cheerfulFiestaPalette } from "@mui/x-charts"

export default function LineChartD(){
    return <>
        <LineChart
        colors={cheerfulFiestaPalette}
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
                {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
            ]}
            height={300}
/>
    </>
}