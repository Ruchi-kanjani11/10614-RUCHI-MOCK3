import Complaint from '../models/Complaint.js';

const validStatuses=
[
    "Open","In Progress","Resolved","Rejected"
];

const validCategories=
[
    "Infrastructure","IT","Cleanliness","Security","Other"
];

const validPriorities=
[
    "Low","Medium","High"
];

export const createComplaint=async(req,res)=>{
    try{
        const {studentName,email,title,description,category,priority,location}=req.body;

        if(!studentName || !email || !title || !description || !category || !priority || !location){
            return res.status(400).json({message:"All fields are required"});
        }

        if(!validCategories.includes(category)){
            return res.status(400).json({message:"Invalid category"});
        }

        if(!validPriorities.includes(priority)){
            return res.status(400).json({message:"Invalid priority"});
        }

        if(!validStatuses.includes(status)){
            return res.status(400).json({message:"Invalid status"});
        }

        const complaint=await Complaint.create({
            studentName,
            email,
            title,
            description,
            category,
            priority,
            location
        });

        res.status(201).json({message:"Complaint created successfully",complaint});
    }catch(error){
        console.log("Error while creating complaint:",error);
        res.status(500).json({message:error.message});
    }
};

export const getAllComplaints=async(req,res)=>{
    try{
        const complaints=await Complaint.find();
        res.status(200).json({complaints});
    }catch(error){
        console.log("Error while fetching complaints:",error);
        res.status(500).json({message:error.message});
    }
};

export const getComplaintById=async(req,res)=>{
    try{
        const {id}=req.params;
        const complaint=await Complaint.findById(id);
        if(!complaint){
            return res.status(404).json({message:"Complaint not found"});
        }
        res.status(200).json({complaint});
    }catch(error){
        console.log("Error while fetching complaint:",error.message);
        res.status(500).json({message:error.message});
    }
}

export const updateComplaint=async(req,res)=>{
    try{
        const {id}=req.params;
        const {status}=req.body;

        if(!validStatuses.includes(status)){
            return res.status(400).json({message:"Invalid status"});
        }

        const complaint=await Complaint.findByIdAndUpdate(id,{status},{new:true});

        if(!complaint){
            return res.status(404).json({message:"Complaint not found"});
        }

        res.status(200).json({message:"Complaint updated successfully",complaint});
    }catch(error){
        console.log("Error while updating complaint:",error.message);
        res.status(500).json({message:error.message});
    }
}

export const deleteComplaint=async(req,res)=>{
    try{
        const {id}=req.params;
        const complaint=await Complaint.findByIdAndDelete(id);
        if(!complaint){
            return res.status(404).json({message:"Complaint not found"});
        }
        res.status(200).json({message:"Complaint deleted successfully"});
    }
    catch(error)
    {
        console.log("Error while deleting complaint:",error.message);
        res.status(500).json({message:error.message});
    }
}


