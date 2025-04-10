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
import IconButton from "@mui/material/IconButton";
const Employee = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [open, setOpen] = useState(false);
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
    console.log("Deleting Employee ID:", id); // :white_tick: Check if correct ID is sent
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
    console.log("Saving Employee Data:", selectedRow); // :white_tick: Check if values exist
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
    { field: "empId", headerName: "Emp ID" },
    { field: "name", headerName: "Name" },
    { field: "age", headerName: "Age" },
    { field: "gender", headerName: "Gender" },
    { field: "dob", headerName: "Date of Birth" },
    { field: "email", headerName: "Email ID" },
    { field: "contact", headerName: "Contact Number" },
    { field: "address", headerName: "Address" },
    { field: "status", headerName: "Status" },
    { field: "joiningDate", headerName: "Joining Date" },
    { field: "role", headerName: "Role" },
    { field: "tenure", headerName: "Tenure" },
    { field: "band", headerName: "Band" },
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
  ];
  // Validation Schema
  const EmployeeSchema = Yup.object().shape({
    empId: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    age: Yup.number().required("Required").positive().integer(),
    gender: Yup.string().required("Required"),
    dob: Yup.date().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    contact: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    joiningDate: Yup.date().required("Required"),
    role: Yup.string().required("Required"),
    tenure: Yup.number().required("Required").positive().integer(),
    band: Yup.string().required("Required"),
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
        <DialogTitle>Edit Employee</DialogTitle>
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
        <DialogActions>
          <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add Employee Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Employee</DialogTitle>
        <Formik
          initialValues={{
            empId: "",
            name: "",
            age: "",
            gender: "",
            dob: "",
            email: "",
            contact: "",
            address: "",
            status: "",
            joiningDate: "",
            role: "",
            tenure: "",
            band: "",
          }}
          validationSchema={EmployeeSchema}
          onSubmit={(values, { resetForm }) => {
            addEmployee(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogContent>
                {[
                  "empId",
                  "name",
                  "age",
                  "gender",
                  "dob",
                  "email",
                  "contact",
                  "address",
                  "status",
                  "joiningDate",
                  "role",
                  "tenure",
                  "band",
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
              <DialogActions
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                }}
              >
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" color="primary" variant="contained">
                  Add
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};
export default Employee;









