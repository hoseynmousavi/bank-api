import createErrorText from "./createErrorText"
import respondTextConstant from "../constants/respondTextConstant"

function saveFile({file, res})
{
    return new Promise(resolve =>
    {
        if (file)
        {
            const fileName = new Date().toISOString() + file.name.replace(/ /g, "")
            const fileUrl = `media/pictures/${fileName}`
            file.mv(fileUrl, err =>
            {
                if (err)
                {
                    createErrorText({res, status: 400, message: respondTextConstant.error.fileSave, detail: err})
                }
                else
                {
                    resolve(fileUrl)
                }
            })
        }
        else resolve(null)
    })
}

export default saveFile