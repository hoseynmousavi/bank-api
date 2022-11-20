import mongoose from "mongoose"
import createErrorText from "../helpers/createErrorText"
import respondTextConstant from "../constants/respondTextConstant"
import createSuccessRespond from "../helpers/createSuccessRespond"
import indicatorModel from "../models/indicatorModel"

const indicatorCL = mongoose.model("indicator", indicatorModel)

function getList(req, res)
{
    const {_id} = req?.query ?? {}
    if (_id)
    {
        indicatorCL.findOne({is_deleted: false, _id})
            .then(data =>
            {
                createSuccessRespond({res, data})
            })
            .catch(err =>
            {
                createErrorText({res, status: 400, message: respondTextConstant.error.getData, detail: err})
            })
    }
    else
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
}

function addItem(req, res)
{
    const newItem = new indicatorCL(req.body)
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

const indicatorController = {
    getList,
    addItem,
}

export default indicatorController