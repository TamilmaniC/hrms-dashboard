import React, { useMemo, useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Header from "../../components/Header";
import hrmsData from "../../data/hrmsData.json";

ModuleRegistry.registerModules([AllCommunityModule]);

const Account = () => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    setRowData(hrmsData.accounts);
  }, []);

  const [columnDefs] = useState([
    { field: "id" },
    { field: "date" },
    { field: "accType" },
    { field: "description" },
    { field: "amount" },
    { field: "transType" },
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
        paddingTop: "60px",
        marginLeft: "30px",
      }}
    >
      <Header title="ACCOUNTS" subtitle="Org - Financial Transactions" />
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

export default Account;
