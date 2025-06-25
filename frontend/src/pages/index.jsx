import { PageContainer } from '@toolpad/core/PageContainer';
import BarChartD from './dashboard/barChartD';
import { Card, Stack, Typography } from '@mui/material';
import PieChartD from './dashboard/pieChartD';
import CardsInfo from './dashboard/cardsInfo';

export default function DashboardPage() {
   
  return <PageContainer>
    <CardsInfo/>
    <Stack
    direction="row"
    spacing={2}
    sx={{
      mt:3,
      justifyContent: "space-evenly",
      alignItems: 'flex-start',
    }}
    >

    <Card sx={{paddingTop:'5%', width:'50%', height:'100%'}}>
      <BarChartD/>
    </Card>

    <Card 
    sx={{paddingTop:'2%', mt:2, width:'50%', height:'100%'}}
    >
      <Typography variant='h6' sx={{mb:'10%', mt:2}}>
        Comparación entre órdenes creadas:
      </Typography>
      <PieChartD/>
    </Card>
    </Stack>
  </PageContainer>;
  
}