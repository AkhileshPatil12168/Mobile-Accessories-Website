import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

export const exportToPDF = (data) => {
  const pdf = new jsPDF();
  const tableColumn = ['product Id','title','price','category', 'free shipping','available quantity','created date']
  const tableRows = data.map((item)=> Object.values({...item,createdAt:item.createdAt.slice(0,10)}));
// console.log(data.map((item)=> Object.values({...item,createdAt:item.createdAt.slice(0,10)})))
  pdf.autoTable({
    head: [tableColumn],
    body: tableRows,
    margin: {  top: 20, right: 10, bottom: 20, left: 10 },
    styles: { overflow: 'linebreak', fontSize: 10, cellPadding: 2, lineWidth: 0.1 },
    headStyles: { fillColor: [300, 200, 200], halign: 'center' },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 40 },
      2: { cellWidth: 20 ,halign: 'center'},
      3: { cellWidth: 30 },
      4: { cellWidth: 30 ,halign: 'center'},
      5: { cellWidth: 20 ,halign: 'center'},
      6: { cellWidth: 25, overflow: 'linebreak',halign: 'center' }, 
    },
    didDrawPage: (data) => {
    
      if (data.table.width > data.settings.margin.left) {
        pdf.addPage();
      }
    },
  });

  pdf.save('products.pdf');
};

export const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
  
    XLSX.writeFile(wb, 'products.xlsx');
  };