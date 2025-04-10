import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const Employee = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/employees");
      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    console.log("Deleting Employee ID:", id);
    try {
      await axios.delete(`http://localhost:3000/api/employees/${id}`);
      fetchEmployees(); // Refresh table after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Handle Edit
  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowEditModal(true);
  };

  // Handle Save
  const handleSave = async () => {
    console.log("Saving Employee Data:", selectedRow);
    if (!selectedRow || !selectedRow._id) return;
    try {
      await axios.put(
        `http://localhost:3000/api/employees/${selectedRow._id}`,
        selectedRow
      );
      fetchEmployees(); // Refresh table after update
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Handle Add Employee
  const addEmployee = async (values) => {
    try {
      await axios.post("http://localhost:3000/api/employees/add", values);
      fetchEmployees(); // Refresh table after adding
      setOpen(false);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Column Definitions
  const columnDefs = [
    { field: "name", headerName: "Name" },
    { field: "status", headerName: "Status" },
    { field: "age", headerName: "Age" },
    { field: "band", headerName: "Band" },
    { field: "gender", headerName: "Gender" },
    { field: "location", headerName: "Location" },
    { field: "position", headerName: "Position" },
    { field: "tenure", headerName: "Tenure" },
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
            onClick={() => {
              setDeleteId(params.data._id);
              setConfirmOpen(true);
            }}
            color="primary"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
      width: 120,
    },
  ];

  // Validation Schema
  const EmployeeSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    age: Yup.number().required("Required").positive().integer(),
    status: Yup.string().required("Required"),
    band: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    position: Yup.string().required("Required"),
    tenure: Yup.number().required("Required").positive().integer(),
  });

  // AG Grid Default Settings
  const defaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",
      floatingFilter: true,
    }),
    []
  );

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
      <Header title="EMPLOYEE" subtitle="Org Employee Details" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Add Employee
      </Button>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        domLayout="autoHeight"
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />

      {/* Edit Employee Modal */}
      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
        <div className="modal-header" style={{ background: "#1976D2", color: "white", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid #ddd" }}>
          <DialogTitle>Edit Employee</DialogTitle>
          <IconButton onClick={() => setShowEditModal(false)} color="dark">
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
        <div className="modal-body" style={{ padding: "16px" }}>
          <DialogContent>
            {selectedRow && (
              <>
                {Object.keys(selectedRow).map(
                  (key) =>
                    key !== "_id" &&
                    key !== "__v" && (
                      <TextField
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        fullWidth
                        margin="dense"
                        value={selectedRow[key] || ""}
                        onChange={(e) =>
                          setSelectedRow({
                            ...selectedRow,
                            [key]: e.target.value,
                          })
                        }
                      />
                    )
                )}
              </>
            )}
          </DialogContent>
        </div>
        <div className="modal-footer" style={{ display: "flex", justifyContent: "flex-end", padding: "16px", borderTop: "1px solid #ddd" }}>
          <DialogActions>
            <Button onClick={handleSave} color="primary" variant="outlined">
              Save
            </Button>
            <Button color="error" variant="outlined" onClick={() => setShowEditModal(false)}>Cancel</Button>

          </DialogActions>
        </div>
      </Dialog>

      {/* Add Employee Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <div className="modal-header" style={{ background: "#1976D2", color: "white", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid #ddd" }}>
          <DialogTitle>Add New Employee</DialogTitle>
          <IconButton onClick={() => setOpen(false)} color="dark">
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>

        </div>
        <Formik
          initialValues={{
            name: "",
            age: "",
            status: "",
            band: "",
            gender: "",
            location: "",
            position: "",
            tenure: "",
          }}
          validationSchema={EmployeeSchema}
          onSubmit={(values, { resetForm }) => {
            addEmployee(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="modal-body" style={{ padding: "16px" }}>
                <DialogContent>
                  {[
                    "name",
                    "age",
                    "status",
                    "band",
                    "gender",
                    "location",
                    "position",
                    "tenure",
                  ].map((field) => (
                    <Field
                      key={field}
                      as={TextField}
                      fullWidth
                      margin="dense"
                      name={field}
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      error={touched[field] && !!errors[field]}
                      helperText={touched[field] && errors[field]}
                    />
                  ))}
                </DialogContent>
              </div>
              <div className="modal-footer" style={{ display: "flex", justifyContent: "flex-end", padding: "16px", borderTop: "1px solid #ddd" }}>
                <DialogActions
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                  }}
                >
                  <Button type="submit" color="primary" variant="outlined">
                    Add
                  </Button>
                  <Button color="error" variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>

                </DialogActions>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Delete Activity */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className="modal-header" style={{ background: "#1976D2", color: "white", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid #ddd" }}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <IconButton onClick={() => setConfirmOpen(false)} color="dark">
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
        <div className="modal-body" style={{ padding: "16px", fontFamily: "Poppins" }}>
          <DialogContent >
            Are you sure want to delete this activity?
          </DialogContent>
        </div>
        <div className="modal-footer" style={{ display: "flex", justifyContent: "flex-end", padding: "16px", borderTop: "1px solid #ddd" }}>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete(deleteId);
                setConfirmOpen(false);
              }}
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default Employee;
