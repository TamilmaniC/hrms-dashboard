import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    status: { type: String, required: true },
    band: { type: String, required: true },
    gender: { type: String, required: true },
    location: { type: String, required: true },
    position: { type: String, required: true },
    tenure: { type: Number, required: true }
});

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;
