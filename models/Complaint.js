const mongoose=require("mongoose");

const complaintSchema=new mongoose.Schema(
    {
        studentName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        category:{
            type:String,
            enum:[
                "Infrastructure",
                "IT",
                "Cleanliness",
                "Security",
                "Other"
             ],
             required:true
        },
        priority:{
            type:String,
            enum:[
                "Low",
                "Medium",
                "High"
            ],
            required:true
        },
        location:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:[
                "Open",
                "In Progress",
                "Resolved",
                "Rejected"
            ],
            default:"Open"
        },
    },
        {
            timestamps:true
        }
);

export default mongoose.model("Complaint",complaintSchema);