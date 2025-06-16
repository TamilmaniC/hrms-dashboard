import React, { useMemo, useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

ModuleRegistry.registerModules([AllCommunityModule]);

const Employees = () => {
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/employees/all"
      );
      setRowData(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (empid) => {
    try {
      await axios.delete(`http://localhost:3000/api/employees/delete/${empid}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowEditModal(true);
  };

  const handleSave = async () => {
    console.log("Saving Employee Data:", selectedRow);
    if (!selectedRow || !selectedRow.empid) return;
    try {
      await axios.put(
        `http://localhost:3000/api/employees/update/${selectedRow.empid}`,
        selectedRow
      );
      fetchEmployees();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const addEmployee = async (values) => {
    try {
      const payload = {
        ...values,
        age: parseInt(values.age),
        empid: values.empid,
      };

      console.log("Payload:", payload);
      await axios.post("http://localhost:3000/api/employees", payload);
      await fetchEmployees();
      setOpen(false);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const [columnDefs] = useState([
    { headerName: " Emp ID", field: "empid" },
    { headerName: "Employee Name", field: "name" },
    { headerName: "Age", field: "age" },
    { headerName: "Gender", field: "gender" },
    {
      headerName: "Date of Birth",
      field: "dob",
      valueFormatter: (params) => {
        if (!params.value) return "";
        return new Date(params.value).toLocaleDateString();
      },
    },
    { headerName: "Email ID", field: "email" },
    { headerName: "Contact Number", field: "contact" },
    { headerName: "Address", field: "address" },
    { headerName: "Status", field: "status" },
    {
      headerName: "Joining Date",
      field: "joining",
      valueFormatter: (params) => {
        if (!params.value) return "";
        return new Date(params.value).toLocaleDateString();
      },
    },
    { headerName: "Role", field: "role" },
    { headerName: "Band", field: "band" },
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
              setDeleteId(params.data.empid);
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
  ]);

  const EmployeeSchema = Yup.object().shape({
    empid: Yup.string().required("ID is Required"),
    name: Yup.string().required("Name is Required"),
    age: Yup.number().required("Age is Required").positive().integer(),
    gender: Yup.string().required("Gender is Required"),
    dob: Yup.date().required("DOB is Required"),
    email: Yup.string().email("Email is Invalid email").required("Required"),
    contact: Yup.string().required("Contact is Required"),
    address: Yup.string().required("Address is Required"),
    status: Yup.string().required("Status is Required"),
    joining: Yup.date().required("Joining Date is Required"),
    role: Yup.string().required("Role is Required"),
    band: Yup.string().required("Band is Required"),
  });

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
        paddingTop: "60px",
        marginLeft: "30px",
      }}
    >
      <Header title="EMPLOYEES" subtitle="Organisation Employee Details" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Add Employees
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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <div
          className="modal-header"
          style={{
            background: "#1976D2",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <DialogTitle> Add Employee</DialogTitle>
          <IconButton onClick={() => setOpen(false)} color="dark">
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
        <Formik
          initialValues={{
            empid: "",
            name: "",
            age: "",
            gender: "",
            dob: "",
            email: "",
            contact: "",
            address: "",
            status: "",
            joining: "",
            role: "",
            band: "",
          }}
          validationSchema={EmployeeSchema}
          onSubmit={async (values, { resetForm }) => {
            await addEmployee(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="modal-body" style={{ padding: "16px" }}>
                <DialogContent>
                  {[
                    "empid",
                    "name",
                    "age",
                    "gender",
                    "dob",
                    "email",
                    "contact",
                    "address",
                    "status",
                    "joining",
                    "role",
                    "band",
                  ].map((field) => (
                    <Field
                      key={field}
                      as={TextField}
                      name={field}
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      error={touched[field] && !!errors[field]}
                      helperText={touched[field] && errors[field]}
                      fullWidth
                      margin="dense"
                      type={
                        ["dob", "joining"].includes(field) ? "date" : "text"
                      }
                      InputLabelProps={
                        ["dob", "joining"].includes(field)
                          ? { shrink: true }
                          : {}
                      }
                    />
                  ))}
                </DialogContent>
              </div>
              <div
                className="modal-footer"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "16px",
                  borderTop: "1px solid #ddd",
                }}
              >
                <DialogActions
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                  }}
                >
                  <Button type="submit" variant="outlined" color="primary">
                    Add Employee
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Edit Activity*/}
      <Dialog
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <div
          className="modal-header"
          style={{
            background: "#1976D2",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #ddd",
          }}
        >
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
                        type={key === "date" ? "date" : "text"}
                        value={
                          key === "date"
                            ? new Date(selectedRow[key])
                                .toISOString()
                                .split("T")[0]
                            : selectedRow[key] || ""
                        }
                        InputLabelProps={key === "date" ? { shrink: true } : {}}
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

        <div
          className="modal-footer"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "16px",
            borderTop: "1px solid #ddd",
          }}
        >
          <DialogActions>
            <Button
              color="error"
              variant="outlined"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary" variant="outlined">
              Save
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* Delete Activity */}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div
          className="modal-header"
          style={{
            background: "#1976D2",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <IconButton onClick={() => setConfirmOpen(false)} color="dark">
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
        <div
          className="modal-body"
          style={{ padding: "16px", fontFamily: "Poppins" }}
        >
          <DialogContent>
            Are you sure want to delete this employee?
          </DialogContent>
        </div>
        <div
          className="modal-footer"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "16px",
            borderTop: "1px solid #ddd",
          }}
        >
          <DialogActions>
            <Button
              onClick={() => setConfirmOpen(false)}
              color="primary"
              variant="outlined"
            >
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

export default Employees;
