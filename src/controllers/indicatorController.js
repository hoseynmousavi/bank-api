import mongoose from "mongoose"
import createErrorText from "../helpers/createErrorText"
import respondTextConstant from "../constants/respondTextConstant"
import createSuccessRespond from "../helpers/createSuccessRespond"
import indicatorModel from "../models/indicatorModel"
import checkPermission from "../helpers/checkPermission"
import bankIndicatorController from "./bankIndicatorController"

const indicatorCL = mongoose.model("indicator", indicatorModel)

function getList(req, res)
{
    indicatorCL.find({is_deleted: false})
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
            const newItem = new indicatorCL(req.body)
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
            indicatorCL.findOneAndUpdate({_id}, data, {new: true, useFindAndModify: false, runValidators: true})
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

function remove(req, res)
{
    checkPermission({req, res})
        .then(() =>
        {
            const {_id} = req.body
            indicatorCL.findOneAndUpdate({_id}, {is_deleted: true}, {new: true, useFindAndModify: false, runValidators: true})
                .then(() =>
                {
                    bankIndicatorController._remove({indicator_id: _id})
                        .then(() =>
                        {
                            createSuccessRespond({res, message: respondTextConstant.success.removeData})
                        })
                        .catch(err =>
                        {
                            createErrorText({res, status: 400, message: respondTextConstant.error.removeData, detail: err})
                        })
                })
                .catch(err =>
                {
                    createErrorText({res, status: 400, message: respondTextConstant.error.removeData, detail: err})
                })
        })
}

const indicatorController = {
    getList,
    addItem,
    updateItem,
    remove,
}

export default indicatorController