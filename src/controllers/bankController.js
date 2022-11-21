import mongoose from "mongoose"
import bankModel from "../models/bankModel"
import createErrorText from "../helpers/createErrorText"
import respondTextConstant from "../constants/respondTextConstant"
import createSuccessRespond from "../helpers/createSuccessRespond"
import saveFile from "../helpers/saveFile"

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
    const logo = req.files?.logo
    if (logo)
    {
        saveFile({file: logo, res})
            .then(logo =>
            {
                const newItem = new bankCL({...req.body, logo, score_chart: JSON.parse(req.body.score_chart)})
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
            })
    }
    else createErrorText({res, status: 400, message: respondTextConstant.error.fileSave})
}

const bankController = {
    getList,
    addItem,
}

export default bankController