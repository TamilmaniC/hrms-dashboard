import React, { useMemo, useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Header from "../../components/Header";
import hrmsData from "../../data/hrmsData.json";

ModuleRegistry.registerModules([AllCommunityModule]);

const Activities = () => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    setRowData(hrmsData.holidays);
  }, []);

  const [columnDefs] = useState([
    { field: "id" },
    { field: "name" },
    { field: "date" },
    { field: "day" },
    { field: "type" },
    { field: "location" },
    { field: "year" },
    { field: "status" },
    { field: "description" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  return (
    <div
      style={{
        height: 500,
        marginRight: "60px",
        paddingTop: "90px", 
        marginLeft: "5%",
      }}
    >
      <Header title="HOLIDAYS" subtitle="Org Holidays Details" />

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div>
  );
};

export default Activities;
