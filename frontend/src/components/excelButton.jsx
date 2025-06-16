// components/ExcelExportButton.jsx

import React from 'react';
import { Button } from '@mui/material';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ExcelExportButton = ({ rows, columns, fileName = 'DataGridExport' }) => {
const handleExport = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  // Filter out the 'actions' column
  const exportableColumns = columns.filter(col => col.field !== 'actions');

  // Add header row with styles
  const headerRow = worksheet.addRow(exportableColumns.map(col => col.headerName));
  headerRow.eachCell(cell => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0070C0' },
    };
    cell.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // Add data rows using filtered columns
  rows.forEach(row => {
    const rowData = exportableColumns.map(col => row[col.field]);
    const dataRow = worksheet.addRow(rowData);
    dataRow.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  // Auto-fit columns
  worksheet.columns.forEach(column => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, cell => {
      const length = (cell.value ? cell.value.toString().length : 0) + 2;
      if (length > maxLength) maxLength = length;
    });
    column.width = maxLength;
  });

  // Generate timestamp: YYYY-MM-DD_HH-MM
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}`;

  const fullFileName = `${fileName}_${timestamp}.xlsx`;

  // Create and save Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, fullFileName);
};

  return (
    <Button variant="contained" color='secondary' onClick={handleExport}>
      Descargar reporte
    </Button>
  );
};

export default ExcelExportButton;
