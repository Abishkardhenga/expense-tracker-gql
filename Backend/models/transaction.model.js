import mongoose, { mongo } from "mongoose";

const transactionSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    description:{
        type:String,
        required:true,
    },
    paymentType:{
        type:String,
        enum:["Cash", "Card"],
        required:True
    },
     category:{
        type:String,
        enum:["Investment", "Saving","Expense"],
        required:True
    },
    amount:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        default:"Unknown"
    },
 
    date:{
        type:Date,
        required:true,
    },
   
   

},{timeStamps:true})


const Transaction = mongoose.model("Transaction", transactionSchema)
export default Transaction;