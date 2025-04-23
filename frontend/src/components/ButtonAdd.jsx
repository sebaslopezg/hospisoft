import * as React from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';

export default function ButtonAdd() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<AddCircleIcon />}>
        Agregar
      </Button>
    </Stack>
  );
}