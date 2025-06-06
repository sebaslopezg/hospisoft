import { PageContainer } from '@toolpad/core/PageContainer';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card } from '@mui/material';

export default function DashboardPage() {
   
  return <PageContainer>
    <Card sx={{paddingTop:'5%'}}>
        <BarChart
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
    />
    </Card>
  </PageContainer>;
  
}