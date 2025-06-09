import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const CitasCreate = (descripcion, pacienteId) => {
    return <>
        <form>
          <Select
              labelId="ageLabel"
              value={medicoValue}
              label="medico"
              name='medicoId'
              onChange={handleChange}
            >
              {
                medicos ? (
                medicos.map((medico) => {
                return(
                  <MenuItem value={medico._id}>{medico.nombre}</MenuItem>
                )
                })
                ) : ''
              }
          </Select>
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