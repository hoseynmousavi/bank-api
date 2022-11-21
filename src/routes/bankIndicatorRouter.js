import urlConstant from "../constants/urlConstant"
import bankIndicatorController from "../controllers/bankIndicatorController"

function bankIndicatorRouter(app)
{
    app.route(urlConstant.bankIndicator)
        .get(bankIndicatorController.getList)
        .post(bankIndicatorController.addItem)
}

export default bankIndicatorRouter