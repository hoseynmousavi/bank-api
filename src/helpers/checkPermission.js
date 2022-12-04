import tokenHelper from "./tokenHelper"
import userController from "../controllers/userController"
import createErrorText from "./createErrorText"
import respondTextConstant from "../constants/respondTextConstant"

function checkPermission({req, res})
{
    return new Promise(resolve =>
    {
        tokenHelper.decodeToken(req?.headers?.authorization)
            .then(({_id}) =>
            {
                userController._getUserById({_id})
                    .then(user =>
                    {
                        if (!user)
                        {
                            createErrorText({res, status: 403, message: respondTextConstant.error.getPermission})
                        }
                        else
                        {
                            resolve(user)
                        }
                    })
                    .catch(err =>
                    {
                        createErrorText({res, status: 500, message: respondTextConstant.error.getPermission, detail: err})
                    })
            })
            .catch(e => createErrorText({res, status: 403, message: respondTextConstant.error.getPermission, detail: e?.message}))
    })
}

export default checkPermission