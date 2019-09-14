/* eslint-disable func-names */
const { validator } = require('../middleware/validator');

const insuranceService = require('../services/insuranceService');

exports.checkCardSupport = async (req, res) => {
  const result = await insuranceService.checkCardSupport(req.body);
  res.send(result);
};
