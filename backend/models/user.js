import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            reqıired: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    { timestaps: true }
)

const User = mongoose.model("User", userSchema);
export default User;