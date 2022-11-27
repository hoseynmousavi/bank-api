import urlConstant from "../constants/urlConstant"
import userController from "../controllers/userController"

function userRouter(app)
{
    // app.route(urlConstant.user)
    //     .post(userController.addUser)

    app.route(urlConstant.login)
        .post(userController.login)
}

export default userRouter