import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    id : { type: String , required: true},
    employeeName : { type: String , required: true},
    type : {type: String, required: true},
    date: {type: Date},
    duration: {type: String},
    department: {type: String},
    status: {type: String},
});

const Activity = mongoose.model('Activity', ActivitySchema);
export default Activity;