import urlConstant from "../constants/urlConstant"
import bannerController from "../controllers/bannerController"

function bannerRouter(app)
{
    app.route(urlConstant.banner)
        .get(bannerController.getList)
        .post(bannerController.addItem)
}

export default bannerRouter