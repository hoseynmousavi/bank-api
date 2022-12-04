import createSuccessRespond from "../helpers/createSuccessRespond"
import createErrorText from "../helpers/createErrorText"
import respondTextConstant from "../constants/respondTextConstant"
import mongoose from "mongoose"
import bannerModel from "../models/bannerModel"
import saveFile from "../helpers/saveFile"
import checkPermission from "../helpers/checkPermission"

const bannerCL = mongoose.model("banner", bannerModel)

function getList(req, res)
{
    bannerCL.find()
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
    checkPermission({res, req})
        .then(() =>
        {
            const {index} = req.body
            const file = req.files?.file
            bannerCL.deleteOne({index})
                .then(() =>
                {
                    saveFile({file, res})
                        .then(src =>
                        {
                            const newItem = new bannerCL({index, src})
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
                })
                .catch(err =>
                {
                    createErrorText({res, status: 400, message: respondTextConstant.error.getData, detail: err})
                })
        })
}

const bannerController = {
    getList,
    addItem,
}

export default bannerController