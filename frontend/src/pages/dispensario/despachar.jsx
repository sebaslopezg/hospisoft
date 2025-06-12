import * as React from 'react';
import { Stack, TextField, Checkbox, ListItemText, ListItemIcon, ListItem, ListItemButton, List, Typography } from '@mui/material';

export const DispensarioDespachar = ()=>{
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const CustomList = ({value, labelId})=>{
    return <ListItem
            key={value}
            secondaryAction={
                <>
                </>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
    }

  return (
    <>
    <Typography variant='h6' sx={{fontWeight:'bold'}}>Medicamentos</Typography>
    <List sx={{ width: '100%', maxWidth:'50%', bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
          <CustomList value={value} labelId={labelId}/>
          <TextField label='disponible' disabled variant='outlined' size='small' type='text' sx={{width:'40%'}}></TextField>
          <TextField label='entregar' variant='outlined' size='small' type='number' sx={{width:'40%'}}></TextField>
          </Stack>
        );
      })}
    </List>
    </>
  );
}