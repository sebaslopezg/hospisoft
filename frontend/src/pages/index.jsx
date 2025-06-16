import { PageContainer } from '@toolpad/core/PageContainer';
import BarChartD from './dashboard/barChartD';
import { Card, Stack, Typography } from '@mui/material';
import PieChartD from './dashboard/pieChartD';
import LineChartD from './dashboard/lineChartD';
import CardsInfo from './dashboard/cardsInfo';

export default function DashboardPage() {
   
  return <PageContainer>
    <CardsInfo/>
    <Card sx={{paddingTop:'5%', minHeight:'50%'}}>
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

    <Card 
    sx={{paddingTop:'2%', mt:2, width:'50%'}}
    >
      <Typography variant='h6' sx={{mb:4}}>
        Comparación entre órdenes creadas:
      </Typography>
      <PieChartD/>
    </Card>
    </Stack>
  </PageContainer>;
  
}