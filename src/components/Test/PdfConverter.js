import React, { useState } from "react";
import { jsPDF } from "jspdf";

const data = [
  {
    _id: "6551371727cea9db338a0dcc",
    title: "boat airdopes 141 bluetooth truly wireless in ear headphones",
    price: 1399,
    category: ["ear phones", "blutooth", "wireless"],
    isFreeShipping: true,
    available_Quantity: 0,
    createdAt: "2023-11-12T20:35:35.460Z",
  },
  {
    _id: "655204354ea1c59f72668502",
    title: "spigen back cover compatible for samsung galaxy a73 5g",
    price: 989,
    category: ["back cover"],
    isFreeShipping: true,
    available_Quantity: 5,
    createdAt: "2023-11-13T11:10:45.213Z",
  },
  {
    _id: "6560e69e83c6126774e595b7",
    title: "iphone 7 hard backcover",
    price: 400,
    category: ["back cover"],
    isFreeShipping: false,
    available_Quantity: 20,
    createdAt: "2023-11-24T18:08:30.678Z",
  },
  {
    _id: "6560e9fdbbe01b4f5a49b3a2",
    title:
      "boat type c a325/a320 tangle-free, sturdy type c cable with 3a rapid charging & 480mbps data transmission(black)",
    price: 125,
    category: ["type-c cable", "charging cable"],
    isFreeShipping: false,
    available_Quantity: 30,
    createdAt: "2023-11-24T18:22:53.248Z",
  },
  {
    _id: "656173b6b04d50dc6cd28bc1",
    title: "iphone 15 (128gb)",
    price: 79998,
    category: ["Smartphones"],
    isFreeShipping: true,
    available_Quantity: 1000,
    createdAt: "2023-11-25T04:10:30.468Z",
  },
  {
    _id: "656567effa1963dc85183eb5",
    title: "poco f5 5g",
    price: 25000,
    category: ["Smartphones"],
    isFreeShipping: true,
    available_Quantity: 1000,
    createdAt: "2023-11-28T04:09:19.525Z",
  },
  {
    _id: "65659c9f164edec732dfe3df",
    title: "usb",
    price: 200,
    category: ["USB"],
    isFreeShipping: true,
    available_Quantity: 10,
    createdAt: "2023-11-28T07:54:07.258Z",
  },
  {
    _id: "65659cae164edec732dfe3ec",
    title: "usbtype c",
    price: 200,
    category: ["USB"],
    isFreeShipping: true,
    available_Quantity: 10,
    createdAt: "2023-11-28T07:54:22.164Z",
  },
  {
    _id: "65659cba164edec732dfe3f9",
    title: "usbtype wekm",
    price: 200,
    category: ["USB"],
    isFreeShipping: true,
    available_Quantity: 10,
    createdAt: "2023-11-28T07:54:34.761Z",
  },
  {
    _id: "6565c9adff221723b2a5e2ca",
    title:
      "tp-link wifi 6 ax1500 mbps archer ax10,smart wifi,triple-core cpu, gigabit, dual-band ofdma, mu-mimo, compatible with alexa, wireless router,black",
    price: 3499,
    category: ["wifi", "router"],
    isFreeShipping: true,
    available_Quantity: 20,
    createdAt: "2023-11-28T11:06:21.088Z",
  },
  {
    _id: "6565dc8a6b248975f09b8520",
    title:
      "sandisk ultra dual drive go usb3.0 type c pendrive for mobile (black, 64 gb, 5y - sdddc3-064g-i35)",
    price: 780,
    category: ["pendrive", "storage"],
    isFreeShipping: true,
    available_Quantity: 30,
    createdAt: "2023-11-28T12:26:50.470Z",
  },
  {
    _id: "6565de3d60ca336e7519a477",
    title:
      "zebronics zeb-pgf150 120mm premium chassis fan with 43.5cfm airflow, multicolor leds, hydraulic bearing, 1200 rpm high speed and 4 pin (molex)",
    price: 399,
    category: ["pc fan", "fan", "cooler"],
    isFreeShipping: false,
    available_Quantity: 10,
    createdAt: "2023-11-28T12:34:05.296Z",
  },
  {
    _id: "6565e413594bf9f5124e1fdb",
    title:
      "ant esports ice- 300 mesh v2 mid-tower computer case/gaming cabinet - black | support atx, micro-atx, mini-itx | pre-installed 3 front fans and 1 rear fan",
    price: 3480,
    category: ["pc cabinet"],
    isFreeShipping: true,
    available_Quantity: 10,
    createdAt: "2023-11-28T12:58:59.089Z",
  },
  {
    _id: "6565e557b2f13996d87fdaac",
    title:
      "samsung 980 pro 1tb up to 7,000 mb/s pcie 4.0 nvme m.2 (2280) internal solid state drive (ssd) (mz-v8p1t0)",
    price: 7999,
    category: ["ssd", "m.2 ssd", "solid state drive"],
    isFreeShipping: true,
    available_Quantity: 20,
    createdAt: "2023-11-28T13:04:23.075Z",
  },
  {
    _id: "6565e6eab2f13996d87fdab7",
    title:
      "cimetech wireless keyboard and mouse, 2.4g usb portable ergonomic keyboard mouse combo with ultra-thin design, compact full size slim keyboard for mac, windows, laptop, computer - grey",
    price: 2299,
    category: ["Mouse", "Keyboard"],
    isFreeShipping: true,
    available_Quantity: 50,
    createdAt: "2023-11-28T13:11:06.051Z",
  },
];
const ProductTable = () => {
    const [pdf, setPdf] = useState(null);
    const [preview, setPreview] = useState(null);
  
    const generatePDF = () => {
        console.log("hello")
      const doc = new jsPDF();
      const tableColumn = ['Title', 'Price', 'Category', 'Free Shipping', 'Available Quantity', 'Created At'];
      const tableRows = [];
  
      // Add data rows
      data.forEach((product) => {
        const productData = [
          product.title,
          product.price,
          product.category.join(', '),
          product.isFreeShipping ? 'Yes' : 'No',
          product.available_Quantity,
          product.createdAt,
        ];
        tableRows.push(productData);
      });
  
      doc.text('Product List', 14, 10);
      doc.autoPrint(tableColumn, tableRows, { startY: 20 });
  
      setPdf(doc);
  
      // Generate a data URL for the preview
      const previewDataUrl = doc.output('datauristring');
      setPreview(previewDataUrl);
    };
  
    const downloadPDF = () => {
      if (pdf) {
        pdf.save('product-list.pdf');
      }
    };
  
    return (
      <div>
        <button onClick={generatePDF}>Generate PDF</button>
        <button onClick={downloadPDF}>Download PDF</button>
        
        {preview && (
          <div>
            <h3>Preview</h3>
            <img src={preview} alt="PDF Preview" style={{ width: '100%' }} />
          </div>
        )}
      </div>
    );
  };

export default ProductTable;
