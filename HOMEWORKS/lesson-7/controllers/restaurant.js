import resClientData from "../utils/index.js";

const croissantController = {
    read: async (req, res) => {
        try {
            const data = req.body
            resClientData(res, 200, data, "DONE")
        } catch (error) {
            resClientData(res, 404, null, error.message)
        }
    }
}

export default croissantController