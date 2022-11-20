import mongoose from "mongoose"

const schema = mongoose.Schema

const indicatorModel = new schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    full_description: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    is_audited: {
        type: Boolean,
        required: true,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
})

export default indicatorModel