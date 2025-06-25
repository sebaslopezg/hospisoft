import {DataGrid} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useNotifications } from '@toolpad/core/useNotifications';
import { Button, Divider, Stack, TextField, Typography, Accordion, AccordionActions, AccordionSummary, AccordionDetails } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useParams } from 'react-router';
import data from './data'
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable';

export const HistoriasView = () => {
    const [rows, setRows] = useState([])
    const [diagnosticosRows, setDataDiagnosticosRows] = useState([])
    const [examenesRows, setExamenesRows] = useState([])
    const [formulasRows, setFormulasRows] = useState([])
    const notifications = useNotifications();
    const [documentoPacienteValue, setdocumentoPaciente] = useState([]);
    const [PacienteDataValue, setPacienteData] = useState([]);
    const [pacienteFound, setPacienteFound] = useState(false)
    const params = useParams()

    const diagnosticosColumns = [
        ...data.diagnosticosColumns
    ]

    const ExamenesColumns = [
        ...data.ExamenesColumns
    ]

    const FormulasColumns = [
        ...data.FormulasColumns,
        {
            field: "actions",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return <>
                    <Tooltip title="Ver detalles">
                        <IconButton href={`/formulas/details/${params.id}`}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </>
            }
        }
    ]

     useEffect(()=>{
            pacienteFound ? getRows() : '' 
            console.log(rows);
        },[PacienteDataValue])
    
        const getRows = () =>{
          console.log(params);
          
            const response = data.getOne(PacienteDataValue._id)
            response.then((data) => {
                const setData = data.data.data
                setRows(setData)
                setDataDiagnosticosRows(setData.diagnosticos)
                setExamenesRows(setData.examenes)
                setFormulasRows(setData.formulas_m)
            })
            
        }

          const handleSearchPerson = () => {
            const response = data.getPacienteByDocument(documentoPacienteValue)
            response.then((res) => {
              console.log(res.data)
              res.data.status ? (
                setPacienteFound(true),
                setPacienteData(res.data.data),
                notifications.show(res.data.msg, 
                {severity: 'success',autoHideDuration: 3000,})
                
              ) : (
                notifications.show(res.data.msg, 
                {severity: 'error',autoHideDuration: 3000,})
              )
            })
            .catch((err) =>{
            notifications.show('Error de conexión: ' + err.message, 
              {severity: 'error',autoHideDuration: 3000,})
            })
          }

    const handleDocumentoPacienteValue = (value) =>{
    setdocumentoPaciente(value)
    }

    const handleEnter = (event)=>{
      if (event.key === 'Enter'){
        handleSearchPerson()
      }
    }

const getImageAsBase64 = (url) => {
  return fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));
};

const downloadPdf = async () => {
  const doc = new jsPDF();
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const newdat = today.toLocaleDateString("es-ES", options);
  doc.setFontSize(10);
  doc.text(10, 5, newdat);

  // Dynamically load and scale the image
  try {
    const imageData = await getImageAsBase64('/logo.png');

    const img = new Image();
    img.src = imageData;

    await new Promise((resolve, reject) => {
      img.onload = () => {
        // Natural image dimensions
        const imgWidth = img.width;
        const imgHeight = img.height;

        // Max dimensions for the PDF
        const maxWidth = 50; // mm
        const maxHeight = 30; // mm

        // Calculate scale to fit inside the max box
        const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;

        // Draw image at top-left
        doc.addImage(imageData, 'PNG', 10, 10, scaledWidth, scaledHeight);
        resolve();
      };
      img.onerror = reject;
    });
  } catch (error) {
    console.error('Image load failed:', error);
  }

  doc.setFontSize(16);
  doc.text("Reporte de Historia Clínica", 70, 25); // Adjust if needed based on image
  let finalY = 50; // Adjust based on image height

  const addFooters = (doc) => {
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text('página ' + i + ' de ' + pageCount, doc.internal.pageSize.width / 2, 287, {
        align: 'center'
      });
    }
  };

  const addTable = (title, columns, rows) => {
    const tableColumns = columns
      .filter(col => col.field !== 'actions')
      .map(col => col.headerName);

    const tableRows = rows.map(row =>
      columns
        .filter(col => col.field !== 'actions')
        .map(col => {
          const value = row[col.field];
          if (typeof value === 'object' && value !== null) {
            if (value.nombre) return value.nombre;
            if (value.name) return value.name;
            if (value._id) return value._id;
            return JSON.stringify(value);
          }
          return value ?? '';
        })
    );

    doc.setFontSize(12);
    doc.text(title, 20, finalY);
    autoTable(doc, {
      startY: finalY + 5,
      head: [tableColumns],
      body: tableRows,
      margin: { top: 10, bottom: 10 },
      didDrawPage: (data) => {
        finalY = data.cursor.y + 10;
      }
    });
  };

  addTable("Diagnósticos", diagnosticosColumns, diagnosticosRows);
  addTable("Exámenes", ExamenesColumns, examenesRows);
  addTable("Fórmulas", FormulasColumns, formulasRows);
  addFooters(doc);
  doc.save('historia_clinica.pdf');
};


    return <>
      <Stack spacing={2} direction='row' sx={{mb:3}} >
          <TextField
            required 
            name="pacienteId" 
            label="Documento del paciente" 
            onChange={(e) => handleDocumentoPacienteValue(e.target.value)}
            onKeyDown={handleEnter}
          />
          <Tooltip title="Buscar Usuario">
            <IconButton onClick={(e) => handleSearchPerson()} aria-label="delete" size="large">
              <SearchIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          {pacienteFound ? <Button onClick={downloadPdf} variant='contained'>Descargar reporte</Button> : <></>}
        </Stack>
        {pacienteFound 
        ? <>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component='span' variant='h5'>Diagnosticos</Typography>
        </AccordionSummary>
        <AccordionDetails>
                  <Grid container direction="column" spacing={1} sx={{mt:3, mb:3}}>
        <Stack direction="row"
            spacing={3}
            sx={{
                justifyContent: "flex-start",
                alignItems: "center",
            }}>
        </Stack>
            <DataGrid
            getRowId={(dataList) => dataList._id}
            rows={diagnosticosRows}
            columns={diagnosticosColumns}
            initialState={{
                pagination: {
                paginationModel: {
                    pageSize: 8,
                },
                },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            />
        </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component='span' variant='h5'>Exámenes</Typography>
        </AccordionSummary>
        <AccordionDetails>
                  <Grid container direction="column" spacing={1} sx={{mt:3, mb:3}}>
        <Stack direction="row"
            spacing={3}
            sx={{
                justifyContent: "flex-start",
                alignItems: "center",
            }}>
            
        </Stack>
            <DataGrid
            getRowId={(dataList) => dataList._id}
            rows={examenesRows}
            columns={ExamenesColumns}
            initialState={{
                pagination: {
                paginationModel: {
                    pageSize: 8,
                },
                },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            />
        </Grid>
        </AccordionDetails>
      </Accordion>

              <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component='span' variant='h5'>Fórmulas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={1} sx={{mt:3, mb:3}}>
        <Stack direction="row"
            spacing={3}
            sx={{
                justifyContent: "flex-start",
                alignItems: "center",
            }}>
            
        </Stack>
            <DataGrid
            getRowId={(dataList) => dataList._id}
            rows={formulasRows}
            columns={FormulasColumns}
            initialState={{
                pagination: {
                paginationModel: {
                    pageSize: 8,
                },
                },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            />
        </Grid>
        </AccordionDetails>
      </Accordion>
        </> 
        
        : <>
        
        </>}
        
    </>;
}