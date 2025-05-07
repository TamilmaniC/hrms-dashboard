import express from "express";
import { Employee } from "../models/Employee.js";

const router = express.Router();

// Create Employee
router.post("/", async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    return res.json({
      status: true,
      message: "Employee added successfully",
      data: newEmployee,
    });
  } catch (err) {
    console.error("Error creating employee:", err);
    return res
      .status(500)
      .json({ status: false, message: "Failed to add employee" });
  }
});

// Get All Employees
router.get("/all", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    return res.json({ status: true, data: employees });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Failed to fetch employees" });
  }
});

// Get Single Employee by ID
router.get("/:empid", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.empid);
    if (!employee)
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    return res.json({ status: true, data: employee });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Failed to fetch employee" });
  }
});

// Update Employee
router.put("/update/:empid", async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { empId: req.params.empid },
    });

    if (!updated) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }

    const updatedEmployee = await Employee.findOne({
      where: { empId: req.params.empid },
    });

    return res.json({
      status: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Failed to update employee" });
  }
});

// Delete Employee
router.delete("/delete/:empid", async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { empId: req.params.empid },
    });
    if (!deleted)
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    return res.json({ status: true, message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Failed to delete employee" });
  }
});

export { router as EmployeeRouter };
