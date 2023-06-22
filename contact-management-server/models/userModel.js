import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please add the username "]
    },
    email: {
        type: String,
        require: [true, "Please add the email"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        require: [true, "Please add the password"],
    }
},
{
    timestamps: true,
}
)

export default mongoose.model("User", userSchema)