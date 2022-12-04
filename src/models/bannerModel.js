import mongoose from "mongoose"

const schema = mongoose.Schema

const bannerModel = new schema({
    index: {
        type: Number,
        enum: [1, 2, 3],
    },
    src: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
})

export default bannerModel