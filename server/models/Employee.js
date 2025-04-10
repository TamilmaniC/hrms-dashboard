import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    empId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true },
    joining: { type: Date, required: true },
    role: { type: String, required: true },
    tenure: { type: Number, required: true },
    band: { type: String, required: true },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;
