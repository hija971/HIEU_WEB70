import SmartPhone from "../models/smartPhone.js";
import { resClientData } from "../utils/index.js";

const smartPhoneController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const smartPhone = new SmartPhone(data)
      const createSmartPhone = await smartPhone.create()
      resClientData(res, 201, createSmartPhone, "Info added successfully")
    } catch (error) {
      resClientData(res, 403, null, error.message);
    }
  },
};

export default smartPhoneController;
