import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import Header from "../../components/Header";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

ModuleRegistry.registerModules([AllCommunityModule]);

const Holidays = () => {
  const [rowData, setRowData] = useState([]);
  const [gridKey, setGridKey] = useState(0); 
  const fileInputRef = useRef(null);

  const columnDefs = [
    { headerName: "Date", field: "date" },
    { headerName: "Day", field: "day" },
    { headerName: "Holiday", field: "holiday" },
    { headerName: "Holiday Type", field: "type" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("holidayData");
    if (saved) {
      setRowData(JSON.parse(saved));
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const csvData = result.data;
          setRowData(csvData);
          localStorage.setItem("holidayData", JSON.stringify(csvData));
          setGridKey((prev) => prev + 1);
          e.target.value = null; 
        },
      });
    }
  };

  return (
    <div
      style={{
        height: 450,
        width: 820,
        marginRight: "60px",
        paddingTop: "60px",
        marginLeft: "30px",
      }}
    >
      <Header title="HOLIDAYS" subtitle="Organisation Holidays Details" />

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ position: "relative", left: "85%", bottom: "10px", gap: 1 }}
        onClick={() => fileInputRef.current.click()}
      >
        Import
        <FileDownloadRoundedIcon />
      </Button>

      <AgGridReact
        key={gridKey}
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default Holidays;
