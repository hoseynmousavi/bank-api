import urlConstant from "../constants/urlConstant"
import bankController from "../controllers/bankController"

function bankRouter(app)
{
    app.route(urlConstant.bank)
        .get(bankController.getList)
        .post(bankController.addItem)
        .patch(bankController.updateItem)
        .put(bankController.updateLogo)
        .delete(bankController.remove)
}

export default bankRouter