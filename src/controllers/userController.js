import mongoose from "mongoose"
import userModel from "../models/userModel"
import createErrorText from "../helpers/createErrorText"
import respondTextConstant from "../constants/respondTextConstant"
import createSuccessRespond from "../helpers/createSuccessRespond"
import crypto from "crypto"
import tokenHelper from "../helpers/tokenHelper"

const userCl = mongoose.model("user", userModel)

function addUser(req, res)
{
    const {username, password} = req.body
    if (password && username)
    {
        const hashPassword = crypto.createHash("md5").update(password).digest("hex")
        const newUser = new userCl({username, password: hashPassword})
        newUser.save((err, data) =>
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
}

function login(req, res)
{
    const {username, password} = req.body
    if (password && username)
    {
        const hashPassword = crypto.createHash("md5").update(password).digest("hex")
        userCl.findOne({username, password: hashPassword}, "username created_date", (err, data) =>
        {
            if (err) createErrorText({res, status: 400, message: respondTextConstant.error.getData})
            else if (!data) createErrorText({res, status: 404, message: respondTextConstant.error.loginFailed})
            else
            {
                const {_id} = data
                tokenHelper.encodeToken({_id})
                    .then(token =>
                    {
                        createSuccessRespond({res, data: {user: data, token}})
                    })
            }
        })
    }
    else createErrorText({res, status: 400, message: respondTextConstant.error.routeNotFound})
}

const userController = {
    addUser,
    login,
}

export default userController