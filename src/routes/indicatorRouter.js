import urlConstant from "../constants/urlConstant"
import indicatorController from "../controllers/indicatorController"

function indicatorRouter(app)
{
    app.route(urlConstant.indicator)
        .get(indicatorController.getList)
        .post(indicatorController.addItem)
}

export default indicatorRouter