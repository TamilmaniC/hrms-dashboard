import React, { useMemo, useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Header from "../../components/Header";
import hrmsData from "../../data/hrmsData.json";

ModuleRegistry.registerModules([AllCommunityModule]);

const Activities = () => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    setRowData(hrmsData.activities);
  }, []);

  const [columnDefs] = useState([
    { field: "id" },
    { field: "employee" },
    { field: "type" },
    { field: "date" },
    { field: "startTime" },
    { field: "endTime" },
    { field: "duration" },
    { field: "department" },
    { field: "status" },
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
      <Header title="ACTIVITIES" subtitle="Employee Activity Tracking" />

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
