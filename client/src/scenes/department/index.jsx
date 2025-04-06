import React, { useMemo, useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Header from "../../components/Header";
import hrmsData from "../../data/hrmsData.json";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

ModuleRegistry.registerModules([AllCommunityModule]);

const Department = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setRowData(hrmsData.department);
  }, []);

  // Edit function
  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowEditModal(true);
  };

  // Delete function
  const handleDelete = (id) => {
    setRowData((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  // Save changes (for Edit)
  const handleSave = () => {
    setRowData((prevRows) =>
      prevRows.map((row) => (row.id === selectedRow.id ? selectedRow : row))
    );
    setShowEditModal(false);
  };

  const columnDefs = useMemo(
    () => [
      { field: "id" },
      { field: "name" },
      { field: "code" },
      { field: "description" },
      { field: "branch" },
      { field: "hod" },
      { field: "reporting manager", headerName: "Reporting Manager" },
      { field: "total employee", headerName: "Total Employees" },
      { field: "budget allocation", headerName: "Budget Allocation" },
      { field: "created date", headerName: "Created Date" },
      { field: "status" },
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
              onClick={() => handleDelete(params.data.id)}
              color="primary"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
        width: 120,
      },
    ],
    []
  );

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
      <Header title="DEPARTMENT" subtitle="Org Departments Details" />

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        domLayout="normal"
        enableSorting={true}
        enableFilter={true}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />

      {/* Edit Modal */}
      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={selectedRow?.name || ""}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, name: e.target.value })
            }
          />
          <TextField
            label="Code"
            fullWidth
            margin="dense"
            value={selectedRow?.code || ""}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, code: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Department;
