import { PageContainer } from '@toolpad/core/PageContainer';
import { Card, Typography } from '@mui/material';

export const PermissionWarning = () => {
    return <>
        <PageContainer>
        <Card>
            <Typography variant='h4' sx={{fontWeight:'bold'}}>No tienes permiso para ver esto</Typography>
        </Card>
        </PageContainer> 
    </>;
}