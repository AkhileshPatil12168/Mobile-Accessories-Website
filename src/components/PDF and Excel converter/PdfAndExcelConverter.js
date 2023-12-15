import { exportToExcel, exportToPDF } from "../../util/pdfAndExcelConverterHook";



const PdfAndExcelConverter = ({data,tableColumn}) => {
  const handleExportPDF = () => {
    console.log(data)
    exportToPDF(data,tableColumn);
  };

  const handleExportExcel = () => {
    exportToExcel(data,tableColumn);
  };
  return (
    <>
      <div className="mb-4 text-center mt-6">
        <button className="bg-red-500 text-white p-2 px-4 mr-4" onClick={handleExportPDF}>
          Export to PDF
        </button>
        <button className="bg-emerald-600 text-white p-2 px-4" onClick={handleExportExcel}>
          Export to Excel
        </button>
      </div>
    </>
  );
};

export default PdfAndExcelConverter;
