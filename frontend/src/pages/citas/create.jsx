import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const CitasCreate = (descripcion, pacienteId) => {
    return <>
        <form>
              <Box sx={{display: 'flex', flexDirection:'column'}}>
                <TextField 
                  multiline 
                  maxRows={4} 
                  required 
                  name="descripcion" 
                  label="Descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <TextField 
                  multiline 
                  maxRows={4} 
                  required 
                  name="pacienteId" 
                  label="Paciente"
                  value={pacienteId}
                  onChange={(e) => setPacienteId(e.target.value)}
                />
              </Box>
        </form>
    </>;
}