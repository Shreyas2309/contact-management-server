import mongoose, { mongo } from "mongoose";

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true,"Please add the contact name"]
    },
    email: {
        type: String,
        required: [true,"Please add the email"]
    },
    phone: {
        type: String,
        required: [true,"Please add the contact phone"]
    }
},
{
    timestamps: true,
}

);

export default mongoose.model("Contact", contactSchema)