import urlConstant from "../constants/urlConstant"
import bankController from "../controllers/bankController"

function bankRouter(app)
{
    app.route(urlConstant.bank)
        .get(bankController.getList)
        .post(bankController.addItem)
}

export default bankRouter