const Joi = require('joi');

exports.sendOTPDataSet = Joi.object().keys({
  mobile: Joi.string().required()
  //mobile: Joi.string().regex(/\+(\d){11, 15}/)
});

exports.verifyOTPDataSet = Joi.object().keys({
  otp: Joi.number().integer().required(),
  id: Joi.number().integer().required()
});

exports.usernameAvailableDataSet = Joi.object().keys({
  username: Joi.string().required()
});

exports.emailAvailableDataSet = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 })
});

exports.signupDataSet = Joi.object().keys({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  suffix: Joi.string(),
  dob: Joi.string(),
  inviteCode: Joi.string(),
  referralCode: Joi.string(),
  isHiddenFromSearch: Joi.boolean().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  gender: Joi.string().required(),

// add more fields here
});

exports.verifyEmailDataSet = Joi.object().keys({
  id: Joi.number().integer().required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  emailCode: Joi.string().required()
});

exports.saveBiometricDataSet = Joi.object().keys({
  id: Joi.number().integer().required(),
  bioMetric: Joi.string().required(),
});

exports.approveClaimDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  ClaimId: Joi.number().integer().required()
// add more fields here
});



/*
exports.estimatedClaimDataSet = Joi.object().keys({

  ProviderId: Joi.number().integer().required(),
  coPay: Joi.number().required(),
  deductible: Joi.number().required(),
  coInsurance: Joi.number().required(),
  selfPay: Joi.number().required(),
  total: Joi.number().required(),
  dateOfService: Joi.string().required(),
  billingEntityNpis: Joi.string().required()
// add more fields here
});
*/

exports.patientProfilePOEMScreen1DataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  isOutOfPocketMaxInNetWorkBenefits: Joi.boolean().required(),
  individualDedPktMaxInNetBenefits: Joi.number().required(),
  individualOutOfPktMaxInNetBenefits: Joi.number().required(),
  familyDedPktMaxInNetBenefits: Joi.number().required(),
  familyOutOfPktMax: Joi.number().required(),
  isOutOfNetWorkbenefits: Joi.boolean().required(),
  individualDedoutOfNetBenefits: Joi.number().required(),
  individualOutOfPktMaxOfNetBenefits: Joi.number().required(),
  familyDedoutOfNetBenefits: Joi.number().required(),
  familyOutOfPocketMax: Joi.number().required(),
});

exports.updatePatientProfilePOEMScreen3DataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  isPrePayInstallments: Joi.boolean().required(),
  prePay1stPayment: Joi.number().required(),
  prePayInstallments: Joi.number().required(),
  isPpiDecliened: Joi.boolean().required(),
  isPpiInstallments: Joi.boolean().required(),
  ppi1stPayment: Joi.number().required(),
  ppiInstallments: Joi.number().required(),
});

exports.memberSearchDataSet = Joi.object().keys({
  memberId: Joi.string().required()
// add more fields here
});

exports.signinDataSet = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});
