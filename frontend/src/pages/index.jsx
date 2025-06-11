import { PageContainer } from '@toolpad/core/PageContainer';
import BarChartD from './dashboard/barChartD';
import { Card, Stack } from '@mui/material';
import PieChartD from './dashboard/pieChartD';
import LineChartD from './dashboard/lineChartD';

export default function DashboardPage() {
   
  return <PageContainer>
    <Card sx={{paddingTop:'5%'}}>
      <BarChartD/>
    </Card>
    <Stack
    direction="row"
    spacing={2}
    sx={{
      mt:3,
      justifyContent: "space-evenly",
      alignItems: 'flex-start',
    }}
    >
    <Card sx={{paddingTop:'2%', mt:2, width:'50%'}}>
      <LineChartD/>
    </Card>
    <Card sx={{paddingTop:'2%', mt:2, width:'50%'}}>
      <PieChartD/>
    </Card>
    </Stack>
  </PageContainer>;
  
}