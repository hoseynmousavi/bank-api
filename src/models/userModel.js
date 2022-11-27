import mongoose from "mongoose"

const schema = mongoose.Schema

const userModel = new schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
})

export default userModel