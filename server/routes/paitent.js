const express = require('express');
const { validateBody } = require('../middleware/validator');
const {
  sendOTPDataSet,
  verifyOTPDataSet,
  emailAvailableDataSet,
  usernameAvailableDataSet,
  signupDataSet,
  verifyEmailDataSet,
  saveBiometricDataSet,
  patientProfilePOEMScreen1DataSet,
  updatePatientProfilePOEMScreen3DataSet,
  approveClaimDataSet,
  memberSearchDataSet,
  signinDataSet
} = require('../validators/patient');
const safeAsync = require('../middleware/asyncController');
const middleware = require('../middleware/authMiddleware');

const router = express.Router();

const {
  sendMobileOTP,
  verifyMobileOTP,
  usernameAvailable,
  emailAvailable,
  verifyEmail,
  signup,
  saveBiometric,
  memberSearch,
  signin,
  changePassword,
  updatePatientProfileBasicInfo,
  updatePatientProfileInsuranceInfo,
  updatePatientProfilePaymentAddBank,
  updatePatientProfilePaymentAddCard,
  updatePatientProfilePOEMScreen1,
  updatePatientProfilePOEMScreen2,
  updatePatientProfilePOEMScreen3,
  getPatientStatement,
  processPaymentForPatient,
  getMonthClaims,
  updateRequestPatientIDCard,
  patientIDCardNotMatch,
  getPatientClaims,
  createPatientClaim,
  editPatientClaim,
  deletePatientClaim,
  approveClaim,
  getApproveClaimDetail,
  testEmailSend,
  testSMSSend,
  getPatientSavingSummary,
  getPatientTimeDeductibleSummary,
  getPatientTimeOOPSummary,
  createScheduleJob,
  saveClaimNotes,
  estimatePPIAndPrePay,
  paymentGovtId
} = require('../controllers/Patient.js');

const {
  createCustomerOnStripe,
  getCustomerFromStripe,
  chargeCustomerOnStripe,
  createCardTokenOnStripe,
  createBankTokenOnStripe,
  createCheckOutSessionOnStripe,
  createCustomerInvoiceOnStripe
} = require('../controllers/Payment.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// method = POST
// endpoint = patient/get-otp
// the final otp third party sms service is yet to be decide
// router.post('/send-otp', middleware.jwtAuth, validateBody(sendOTPDataSet), safeAsync(sendMobileOTP));
router.post('/send-otp', validateBody(sendOTPDataSet), safeAsync(sendMobileOTP));

// method = PUT
// endpoint = patient/verify-otp
router.put('/verify-otp', validateBody(verifyOTPDataSet), safeAsync(verifyMobileOTP));

// method = POST
// endpoint =  patient/username-available
router.post(
  '/username-available',
  validateBody(usernameAvailableDataSet),
  safeAsync(usernameAvailable)
);

// method = POST
// endpoint =  patient/email-available
router.post('/email-available', validateBody(emailAvailableDataSet), safeAsync(emailAvailable));

// method = POST
// endpoint =  patient/email/verification
router.post('/email/verification', validateBody(emailAvailableDataSet), safeAsync(verifyEmail));

// method = POST
// endpoint =  patient/email/verification validateBody(signupDataSet),
router.post('/signup', validateBody(signupDataSet), safeAsync(signup));

// method = POST
// endpoint =  patient/change-password
router.post('/change-password', safeAsync(changePassword));

// method = PUT
// endpoint = patient/email/verification
router.put('/email/verification', validateBody(verifyEmailDataSet), safeAsync(verifyEmail));

// method = POST
// endpoint = patient/search
router.post('/search', validateBody(memberSearchDataSet), safeAsync(memberSearch));

// method = POST
// endpoint = patient/signin
router.post('/signin', validateBody(signinDataSet), safeAsync(signin));

// method = POST
// endpoint = patient/security-questions
// Returning Dummy data for /paitent/security-questions POST call
// Will be replaced with actual code during development task
router.post('/security-questions', (req, res) => {
  res.send({
    status: 'OK',
    message: 'security questions submitted successfully'
  });
});

// method = PUT
// endpoint = patient/profile/basic
router.put('/save-biometric', validateBody(saveBiometricDataSet), safeAsync(saveBiometric));

// method = PUT
// endpoint = patient/profile/basic
router.put('/profile/basic', safeAsync(updatePatientProfileBasicInfo));

// method = PUT
// endpoint = patient/profile/insurance
router.put('/profile/insurance', safeAsync(updatePatientProfileInsuranceInfo));

// method = POST
// endpoint = patient/profile/payment-add-bank
router.post('/profile/payment-add-bank', safeAsync(updatePatientProfilePaymentAddBank));

// method = POST
// endpoint = patient/profile/payment-add-card
router.post('/profile/payment-add-card', safeAsync(updatePatientProfilePaymentAddCard));

// method = POST
// endpoint = patient/profile/poem-screen1
router.post('/profile/poem-screen1', validateBody(patientProfilePOEMScreen1DataSet), safeAsync(updatePatientProfilePOEMScreen1));

// method = POST
// endpoint = patient/profile/poem-screen2
router.post('/profile/poem-screen2', safeAsync(updatePatientProfilePOEMScreen2));

// method = PUT
// endpoint = patient/profile/poem-screen3
router.put('/profile/poem-screen3', validateBody(updatePatientProfilePOEMScreen3DataSet), safeAsync(updatePatientProfilePOEMScreen3));

// method = POST
// endpoint = patient/statement
router.post('/statement', safeAsync(getPatientStatement));

// method = POST
// endpoint = patient/payment-process
router.post('/payment-process', safeAsync(processPaymentForPatient));

// method = GET
// endpoint = patient/month-claims
router.get('/month-claims', safeAsync(getMonthClaims));

// method = PUT
// endpoint =  patient/id-card-update
router.put('/id-card-update', safeAsync(updateRequestPatientIDCard));

// method = PUT
// endpoint =  patient/id-card-not-match
router.put('/id-card-not-match', safeAsync(patientIDCardNotMatch));

// method = GET
// endpoint =  patient/claims
router.get('/claims', safeAsync(getPatientClaims));

// method = POST
// endpoint =  patient/claim-notes
router.post('/claim-notes', safeAsync(saveClaimNotes));
// router.post('/claim-notes', validateBody(estimatedClaimDataSet), safeAsync(createPatientClaim));

// method = POST
// endpoint =  patient/claims
// router.post('/claim', validateBody(estimatedClaimDataSet), safeAsync(createPatientClaim));

// method = PUT
// endpoint =  patient/claim
router.put('/claim', safeAsync(editPatientClaim));

// method = DELETE
// endpoint =  patient/claim
router.delete('/claim/:id', safeAsync(deletePatientClaim));

// method = GET
// endpoint =  patient/list-claims
router.get('/list-claims', safeAsync(approveClaim));

// method = GET
// endpoint =  patient/claim/:id
router.get('/approve-claim/:id', safeAsync(getApproveClaimDetail));

// method = POST
// endpoint = patient/approve-claim
router.post('/approve-claim', validateBody(approveClaimDataSet), safeAsync(approveClaim));

// method = POST
// endpoint =  patient/testSendEmail
router.post('/testSendEmail', safeAsync(testEmailSend));

// method = POST
// endpoint =  patient/testSMSEmail
router.post('/testSMSEmail', safeAsync(testSMSSend));

// method = POST
// endpoint =  patient/payment/customer/create
router.post('/payment/customer/create', safeAsync(createCustomerOnStripe));

// method = POST
// endpoint =  patient/payment/customer/get
router.post('/payment/customer/get', safeAsync(getCustomerFromStripe));

// method = POST
// endpoint =  patient/payment/customer/charge
router.post('/payment/customer/charge', safeAsync(chargeCustomerOnStripe));

// method = POST
// endpoint =  patient/payment/customer/card-token
router.post('/payment/customer/card-token', safeAsync(createCardTokenOnStripe));

// method = POST
// endpoint =  patient/payment/customer/bank-token
router.post('/payment/customer/bank-token', safeAsync(createBankTokenOnStripe));

// method = POST
// endpoint =  patient/payment/customer/checkout-session
router.post('/payment/customer/checkout-session', safeAsync(createCheckOutSessionOnStripe));

// method = POST
// endpoint =  patient/payment/customer/customer-invoice
router.post('/payment/customer/customer-invoice', safeAsync(createCustomerInvoiceOnStripe));

// method = GET
// endpoint =  patient/saving-summary/:id
router.get('/saving-summary/:id', safeAsync(getPatientSavingSummary));

// method = GET
// endpoint =  patient/time-deductible/:id
router.get('/time-deductible/:id', safeAsync(getPatientTimeDeductibleSummary));

// method = GET
// endpoint =  patient/time-oop/:id
router.get('/time-oop/:id', safeAsync(getPatientTimeOOPSummary));

// method = GET
// endpoint =  patient/test-cron-job
router.get('/test-cron-job', safeAsync(createScheduleJob));

// method = GET
// endpoint =  patient/estimate-prepay-ppi/:id
router.get('/estimate-prepay-ppi/:id', safeAsync(estimatePPIAndPrePay));

// method = POST
// endpoint =  patient/profile/payment-govt-id
router.post('/profile/payment-govt-id', safeAsync(paymentGovtId));

// method = GET
// endpoint = patient/fetch-security-questions
// Returning Dummy data for /paitent/fetch-security-questions // Will be replaced with actual code during development task
router.get('/security-questions', (req, res) => {
  res.send({
    status: 'OK',
    message: 'security questions submitted successfully',
    data: [
      { question_id: 1, question: 'favorite pet name?' },
      { question_id: 2, question: 'favorite pet name?' }
    ]
  });
});

// method = PUT
// endpoint = patient/signin/security-questions
// Returning Dummy data for /paitent/signin/security-questions // Will be replaced with actual code during development task
router.put('/security-questions', (req, res) => {
  res.send({
    status: 'OK',
    message: 'security question verified successfully'
  });
});

// method = POST
// endpoint = patient/retrive-username/identify 
// Will be replaced with actual code during development task
router.post('/retrive-username/identify', (req, res) => {
  res.send({
    "status": "OK",
    "message": "user identified successfully",
    "userId": 1
  });
});

// method = POST
// endpoint =  patient/retrive-username/security-questions 
// Will be replaced with actual code during development task
router.post('/retrive-username/security-questions', (req, res) => {
  res.send({
    "status": "OK",
    "message": "user identified successfully",
    "userId": 1
  });
});

// method = POST
// endpoint =   patient/forgot-password/identify 
// Will be replaced with actual code during development task
router.post('/forgot-password/identify', (req, res) => {
  res.send({
    "status": "OK",
    "message": "user identified successfully",
    "userId": 1
  });
});

// method = POST
// endpoint =    patient/forgot-password/security-question 
// Will be replaced with actual code during development task
router.post('/forgot-password/security-question', (req, res) => {
  res.send({
    "status": "OK",
    "message": "user identified successfully",
    "userId": 1
  });
});

// method = POST
// endpoint =     patient/memberid/searchbybarcode 
// Will be replaced with actual code during development task
router.post('/memberid/searchbybarcode', (req, res) => {
  res.send({
    "status": "OK",
    "message": "Data fetched successfully",
    "data": {
      "memberId": 1234564789
    }
  });
});

// method = PUT
// endpoint =     patient/change-username 
// Will be replaced with actual code during development task
router.post('/change-username', (req, res) => {
  res.send({
    "status": "OK",
    "message": "data updated successfully"
  });
});

module.exports = router;
