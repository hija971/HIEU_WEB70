import { resClientData } from "../utils/index.js";

const smartPhoneController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      resClientData(res, 201, data, "Info added successfull")
    } catch (error) {
      resClientData(res, 403, null, error.message);
    }
  },
};

export default smartPhoneController;
