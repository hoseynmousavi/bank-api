import urlConstant from "../constants/urlConstant"
import bankIndicatorController from "../controllers/bankIndicatorController"

function bankIndicatorRouter(app)
{
    app.route(urlConstant.bankIndicator)
        .get(bankIndicatorController.getList)
        .post(bankIndicatorController.addItem)
        .patch(bankIndicatorController.updateItem)
}

export default bankIndicatorRouter