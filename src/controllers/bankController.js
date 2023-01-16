import mongoose from "mongoose"
import bankModel from "../models/bankModel"
import createErrorText from "../helpers/createErrorText"
import respondTextConstant from "../constants/respondTextConstant"
import createSuccessRespond from "../helpers/createSuccessRespond"
import saveFile from "../helpers/saveFile"
import checkPermission from "../helpers/checkPermission"
import bankIndicatorController from "./bankIndicatorController"

const bankCL = mongoose.model("bank", bankModel)

function getList(req, res)
{
    bankCL.find({is_deleted: false})
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
            const logo = req.files?.logo
            if (logo)
            {
                saveFile({file: logo, res})
                    .then(logo =>
                    {
                        const newItem = new bankCL({...req.body, logo})
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
            else createErrorText({res, status: 400, message: respondTextConstant.error.fileSave})
        })
}

function updateItem(req, res)
{
    checkPermission({req, res})
        .then(() =>
        {
            const {_id, data} = req.body
            bankCL.findOneAndUpdate({_id}, data, {new: true, useFindAndModify: false, runValidators: true})
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

function updateLogo(req, res)
{
    checkPermission({req, res})
        .then(() =>
        {
            const {_id} = req.body
            const file = req.files?.file

            saveFile({file, res})
                .then(logo =>
                {
                    bankCL.findOneAndUpdate({_id}, {logo}, {new: true, useFindAndModify: false, runValidators: true})
                        .then(updated =>
                        {
                            createSuccessRespond({res, data: updated, message: respondTextConstant.success.updateData})
                        })
                        .catch(err =>
                        {
                            createErrorText({res, status: 400, message: respondTextConstant.error.updateData, detail: err})
                        })
                })
        })
}

function remove(req, res)
{
    checkPermission({req, res})
        .then(() =>
        {
            const {_id} = req.body
            bankCL.findOneAndUpdate({_id}, {is_deleted: true}, {new: true, useFindAndModify: false, runValidators: true})
                .then(() =>
                {
                    bankIndicatorController._remove({bank_id: _id})
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

const bankController = {
    getList,
    addItem,
    updateItem,
    updateLogo,
    remove,
}

export default bankController