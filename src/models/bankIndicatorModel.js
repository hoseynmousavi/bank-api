import mongoose from "mongoose"

const schema = mongoose.Schema

const bankIndicatorModel = new schema({
    bank_id: {
        type: schema.Types.ObjectId,
        required: true,
    },
    indicator_id: {
        type: schema.Types.ObjectId,
        required: true,
    },
    percent: {
        type: Number,
        required: true,
    },
    score_chart: {
        type: Array,
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

export default bankIndicatorModel