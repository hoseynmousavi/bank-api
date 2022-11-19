import mongoose from "mongoose"

const schema = mongoose.Schema

const bankModel = new schema({
    logo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    established_year: {
        type: Number,
        required: true,
    },
    total_score: {
        type: Number,
        required: true,
    },
    deposit_amount: {
        type: Number,
        required: true,
    },
    major_shareholders: {
        type: String,
        required: true,
    },
    employees_numbers: {
        type: Number,
        required: true,
    },
    basic_capital: {
        type: Number,
        required: true,
    },
    branches_number: {
        type: Number,
        required: true,
    },
    score_chart: {
        type: [{name: String, score: Number}],
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

export default bankModel