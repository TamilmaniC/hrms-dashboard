import React, { useMemo, useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Header from "../../components/Header";
import hrmsData from "../../data/hrmsData.json";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

ModuleRegistry.registerModules([AllCommunityModule]);

const Activities = () => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    setRowData(hrmsData.activities);
  }, []);

  const [columnDefs] = useState([
    { headerName: "ID", field: "id" },
    { headerName: "Employee Name", field: "employee" },
    { headerName: "Type", field: "type" },
    { headerName: "Date", field: "date" },
    { headerName: "LogIn", field: "logIn" },
    { headerName: "LogOut", field: "logOut" },
    { headerName: "Duration", field: "duration" },
    { headerName: "Department", field: "department" },
    { headerName: "Status", field: "status" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton
            onClick={() => handleEdit(params.data)}
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.data._id)}
            color="primary"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
      width: 120,
    },
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
        height: 450,
        marginRight: "60px",
        paddingBottom: "35px",
        paddingTop: "90px",
        marginLeft: "5%",
      }}
    >
      <Header title="ACTIVITIES" subtitle="Employee Activity Tracking" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Add Activities
      </Button>

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
