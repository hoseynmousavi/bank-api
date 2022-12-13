import mongoose from "mongoose"
import bankIndicatorModel from "../models/bankIndicatorModel"
import createErrorText from "../helpers/createErrorText"
import respondTextConstant from "../constants/respondTextConstant"
import createSuccessRespond from "../helpers/createSuccessRespond"
import checkPermission from "../helpers/checkPermission"

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
    checkPermission({req, res})
        .then(() =>
        {
            const newItem = new bankIndicatorCL({...req.body, score_chart: JSON.parse(req.body.score_chart)})
            newItem.save()
                .then(data =>
                {
                    createSuccessRespond({res, data, message: respondTextConstant.success.addData})
                })
                .catch(err =>
                {
                    createErrorText({res, status: 400, message: respondTextConstant.error.createData, detail: err})
                })
        })
}

function updateItem(req, res)
{
    checkPermission({req, res})
        .then(() =>
        {
            const {_id, data} = req.body
            bankIndicatorCL.findOneAndUpdate({_id}, {score_chart: JSON.parse(data.score_chart)}, {new: true, useFindAndModify: false, runValidators: true})
                .then(updated =>
                {
                    createSuccessRespond({res, data: updated, message: respondTextConstant.success.updateData})
                })
                .catch(err =>
                {
                    createErrorText({res, status: 400, message: respondTextConstant.error.updateData, detail: err})
                })
        })
}

function _remove(query)
{
    return bankIndicatorCL.updateMany(query, {is_deleted: true}, {new: true, useFindAndModify: false, runValidators: true})
}

const bankIndicatorController = {
    getList,
    addItem,
    updateItem,
    _remove,
}

export default bankIndicatorController