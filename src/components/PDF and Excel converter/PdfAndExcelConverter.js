import { exportToExcel, exportToPDF } from "../../util/pdfAndExcelConverterHook";



const PdfAndExcelConverter = ({data}) => {
  const handleExportPDF = () => {
    exportToPDF(data);
  };

  const handleExportExcel = () => {
    exportToExcel(data);
  };
  return (
    <>
      <h1 className="text-center">Products</h1>
      <div className="mb-4 text-center">
        <button className="bg-red-500 text-white p-2 px-4 mr-2" onClick={handleExportPDF}>
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
