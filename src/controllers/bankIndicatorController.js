import mongoose from "mongoose"
import bankIndicatorModel from "../models/bankIndicatorModel"
import createErrorText from "../helpers/createErrorText"
import respondTextConstant from "../constants/respondTextConstant"
import createSuccessRespond from "../helpers/createSuccessRespond"

const bankIndicatorCL = mongoose.model("bank-indicator", bankIndicatorModel)

function getList(req, res)
{
    bankIndicatorCL.find({is_deleted: false})
        .then(data =>
        {
            createSuccessRespond({res, data})
        })
        .catch(err =>
        {
            createErrorText({res, status: 400, message: respondTextConstant.error.getData, detail: err})
        })
}

function addItem(req, res)
{
    const newItem = new bankIndicatorCL({...req.body, score_chart: JSON.parse(req.body.score_chart)})
    newItem.save((err, data) =>
    {
        if (err)
        {
            createErrorText({res, status: 400, message: respondTextConstant.error.createData, detail: err})
        }
        else
        {
            createSuccessRespond({res, data, message: respondTextConstant.success.addData})
        }
    })
}

const bankIndicatorController = {
    getList,
    addItem,
}

export default bankIndicatorController