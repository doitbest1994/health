/* eslint-disable func-names */
const passport = require('passport');
const _ = require('lodash');
const { validator } = require('../middleware/validator');
const patientConstants = require('../constants/patientConstants');
const patientService = require('../services/patientService');
const claimService = require('../services/claimService');
const emailService = require('../services/emailService');
const activityService = require('../services/activityService');
const smsService = require('../services/smsService');
const cronService = require('../services/cronService');

exports.sendMobileOTP = async (req, res) => {
  const result = await patientService.sendMobileOTP(req.body);
  res.send(result);
};

exports.verifyMobileOTP = async (req, res) => {
  const result = await patientService.verifyMobileOTP(req.body);
  res.send(result);
};

exports.usernameAvailable = async (req, res) => {
  const result = await patientService.usernameAvailable(req.body);
  res.send(result);
};

exports.emailAvailable = async (req, res) => {
  const result = await patientService.emailAvailable(req.body);
  res.send(result);
};

exports.verifyEmail = async (req, res) => {
  const result = await patientService.verifyEmail(req.body);
  res.send(result);
};

exports.signup = async(req, res) => {
  const result = await patientService.signup(req.body);
  res.send(result);
};

exports.saveBiometric = async(req, res) => {
  const result = await patientService.saveBiometric(req.body);
  res.send(result);
};

exports.signin = async (req, res, next) => {
  // const result = await patientService.signin(req.body);
  // res.send(result);

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      if (err == 'Un Verified') {
        return res.status(403).json({
          code: 'E_UNAUTHORIZED',
          message: info,
          data: null
        });
      }
      return res.status(401).json({
        code: 'E_UNAUTHORIZED',
        message: 'Username or password is incorrect',
        data: {
          user: null
        }
      });
    }

    req.login(user, { session: false }, async err => {
      if (err) {
        res.send(err);
      }

      const payload = _.pick(user);
      const options = {
        expiresIn: '1 days',
        notBefore: '1 days',
        issuer: 'POEM'
      };
      // generate a signed son web token with the contents of user object and return it in the response
      // console.log('payload',payload)
      // 60 * 60 * 24
      const token = jwt.sign(payload, 'POEM', { expiresIn: 60 * 60 * 24 });

      return res.json({
        code: 'OK',
        data: token,
        message: 'User logged in successfully.'
      });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy(function(err) {
    res.redirect('/'); // Inside a callback… bulletproof!
  });
};

exports.changePassword = async (req, res) => {
  const result = await patientService.changePassword(req.body);
  res.send(result);
};

exports.updatePatientProfileBasicInfo = async (req, res) => {
  const result = await patientService.updatePatientProfileBasicInfo(req.body);
  res.send(result);
};

exports.updatePatientProfileInsuranceInfo = async (req, res) => {
  const result = await patientService.updatePatientProfileInsuranceInfo(req.body);
  res.send(result);
};

exports.updatePatientProfilePaymentAddBank = async (req, res) => {
  const result = await patientService.updatePatientProfilePaymentAddBank(req.body);
  res.send(result);
};

exports.updatePatientProfilePaymentAddCard = async (req, res) => {
  const result = await patientService.updatePatientProfilePaymentAddCard(req.body);
  res.send(result);
};

exports.updatePatientProfilePOEMScreen1 = async (req, res) => {
  const result = await patientService.updatePatientProfilePOEMScreen1(req.body);
  res.send(result);
};

exports.updatePatientProfilePOEMScreen2 = async (req, res) => {
  const result = await patientService.updatePatientProfilePOEMScreen2(req.body);
  res.send(result);
};

exports.updatePatientProfilePOEMScreen3 = async (req, res) => {
  res.send( {
      "status": "OK",
      "message": "Data updated successfully",
    });
  // const result = await patientService.updatePatientProfilePOEMScreen3(req.body);
  // res.send(result);
};

exports.getPatientStatement = async (req, res) => {
  res.send({
    status: 200,
    message: 'Data fetched successfully',
    data: [
      {
        prePay_Due: 'value',
        prePay_Paid: 'value',
        prePay_DueBalance: 'value',
        prePay_AvailableBalance: 'value',

        ppi_Due: 'value',
        ppi_Paid: 'value',
        ppi_DueBalance: 'value',
        ppi_AvailableBalance: 'value',

        buffer_Due: 'value',
        buffer_Paid: 'value',
        buffer_DueBalance: 'value',
        buffer_AvailableBalance: 'value',

        lateFee_Due: 'value',
        lateFee_Paid: 'value',
        lateFee_DueBalance: 'value',
        lateFee_AvailableBalance: 'value',

        interest_Due: 'value',
        interest_Paid: 'value',
        interest_DueBalance: 'value',
        interest_AvailableBalance: 'value',

        owedToProvider_Due: 'value',
        owedToProvider_Paid: 'value',
        owedToProvider_DueBalance: 'value',
        owedToProvider_AvailableBalance: 'value',

        owedToProvider_90days_Due: 'value',
        owedToProvider_90days_Paid: 'value',
        owedToProvider_90days_DueBalance: 'value',
        owedToProvider_90days_AvailableBalance: 'value',

        estimated_Due: 'value',
        estimated_Paid: 'value',
        estimated_DueBalance: 'value',
        estimated_AvailableBalance: 'value',

        monthlyPayment: 'value',
        dueDate: 'value'
      }
    ]
  })
  // const result = await patientService.getPatientStatement(req.body);
  // res.send(result);
};

exports.processPaymentForPatient = async (req, res) => {
  patientService.processPaymentForPatient(req.body).then(result => {
    if (result.status == 200) {
      // activityService.signup({PatientId: payload.PatientId, fees:20}) // Not using right now. Will use later on
      patientService.getRecord({ id: payload.PatientId }).then(patient => {
        activityService.ppi({ PatientId: payload.PatientId, ppi: patient.ppiTotalAmount });
        activityService.prepay({ PatientId: payload.PatientId, prepay: patient.prePayReq });
      });
    }
    res.send(result);
  });

  // const result = await patientService.processPaymentForPatient(req.body);
};

exports.getMonthClaims = async (req, res) => {
  res.send({
    status: 200,
    message: 'Data fetched successfully',
    data: [
      {
        PatientId: res.body.PatientId,
        ProviderId: 999,
        claimType: res.body.claimType,
        coPay: 12,
        deductible: 12,
        coInsurance: 12,
        selfPay: 12,
        total: 12,
        isOutOfNetwork:  false,
        isApprovedByPatient: false,
        approvedByPatientTime: null,
        providerGenratedId: "ACBD1234",
        insuranceGenratedId: "XYZ1234",
        dateOfServiceFrom: "2019-10-12",
        dateOfServiceTo: "2019-10-14",
        outOfNetwork: 12,
        notCovered: 12,
        noPriorAuthorization: 12,
        denied: 12,
        charity: 12,
        writeOff: 12,
        rebate: 12,
        coupon: 12,
        other: 12,
        status: Default,
        notes: "Some notes",
        unbundlling: "abcd",
        duplicate: "abcd",
        billed: "abcd",
        approved: "abcd",
        contractAssignment: "abcd",
        billingEntityNpi: "abcd",
        BillingEntityId: "abcd",
        isActive: true,
        isPaid: false,
        paidAmount: 50,
        balanceAmount: 100
      }
    ]
  })
  // const result = await patientService.getPatientMonthlyClaims(req.query);
  // res.send(result);
};

exports.getPatientClaims = async (req, res) => {
  const result = await patientService.getPatientClaims(req.body);
  res.send(result);
};

exports.createPatientClaim = async (req, res) => {
  console.log("Controller - createPatientClaim - Called");
  claimService.addEstimatedClaim(req.body).then(result => {
    if (result.status == 200) {
      // patientService.getRecord({ id: payload.PatientId }).then(patient => {
        // activityService.estimatedClaim({
        //   PatientId: payload.PatientId,
        //   ProviderId: patient.ProviderId,
        //   service: 'Some service name',
        //   coPay: payload.coPayAmount,
        //   deductable: payload.deductibleAmount,
        //   coInsurance: payload.coInsuranceAmount,
        //   selfPay: payload.selfPayAmount,
        //   total: payload.totalAmount,
        //   charity: 0,
        //   buffer: 0,
        //   prepay: 0,
        //   ppi: 0,
        //   fees: 0,
        //   outOfPocketMax: 0,
        //   installments: 1
        // });
      // });
    }
    res.send(result);
  });
};

exports.editPatientClaim = async (req, res) => {
  const result = await patientService.editPatientClaim(req.body);
  res.send(result);
};

exports.deletePatientClaim = async (req, res) => {
  const result = await patientService.deletePatientClaim(req.params);
  res.send(result);
};

exports.approveClaim = async (req, res) => {
  res.send({
    status: 200,
    message: 'Data fetched successfully',
    data: [
      {
        id: 989,
        PatientId: res.body.PatientId,
        ProviderId: 999,
        claimType: res.body.claimType,
        coPay: 12,
        deductible: 12,
        coInsurance: 12,
        selfPay: 12,
        total: 12,
        isOutOfNetwork:  false,
        isApprovedByPatient: false,
        approvedByPatientTime: null,
        providerGenratedId: "ACBD1234",
        insuranceGenratedId: "XYZ1234",
        dateOfServiceFrom: "2019-10-12",
        dateOfServiceTo: "2019-10-14",
        outOfNetwork: 12,
        notCovered: 12,
        noPriorAuthorization: 12,
        denied: 12,
        charity: 12,
        writeOff: 12,
        rebate: 12,
        coupon: 12,
        other: 12,
        status: Default,
        notes: "Some notes",
        unbundlling: "abcd",
        duplicate: "abcd",
        billed: "abcd",
        approved: "abcd",
        contractAssignment: "abcd",
        billingEntityNpi: "abcd",
        BillingEntityId: "abcd",
        isActive: true,
        isPaid: false,
        paidAmount: 50,
        balanceAmount: 100
      }
    ]
  })
  // const result = await patientService.getPatientClaimsList(req.params);
  // res.send(result);
};

exports.getApproveClaimDetail = async (req, res) => {
  res.send({
    status: 200,
    message: 'Data fetched successfully',
    data: {
        coPay_estimated: 123,
        deductible_estimated: 123,
        coInsurance_estiamted: 123,
        selfPay_estimated: 123,
        notCovered_estiamted: 123,
        noPriorAuthorization_estiamted: 123,
        outOfNetwork_estiamted: 123,
        charity_estimated: 123,
        writeOff_estiamted: 123,

        coPay_final: 123,
        deductible_final: 123,
        coInsurance_final: 123,
        selfPay_final: 123,
        notCovered_final: 123,
        noPriorAuthorization_final: 123,
        outOfNetwork_final: 123,
        charity_final: 123,
        writeOff_final: 123
      }

  })
  // const result = await patientService.getPatientClaimDetail(req.params);
};

exports.approveClaim = async (req, res) => {
  res.send({
    "status": "OK",
    "message": "data has been submitted successfully"
  });
  // const result = await claimService.approveClaim(req.body);
  // res.send(result);
};

exports.saveClaimNotes = async (req, res) => {
  res.send({
    "status": "OK",
    "message": "data has been submitted successfully"
  });
  // const result = await claimService.approveClaim(req.body);
  // res.send(result);
};

exports.memberSearch = async (req, res) => {
  const result = await patientService.memberSearch(req.body);
  res.send(result);
};

exports.testEmailSend = async (req, res) => {
  // const result = await emailService.sendMail(mailOptions);
  const result = await emailService.sendEmailWithType(
    {},
    'muddassir_92@hotmail.com',
    'Test_Email',
    {
      name: 'muddassir'
    }
  );
  res.send(result);
};

exports.testSMSSend = async (req, res) => {
  const result = await smsService.sendSMSWithType(
    {name:'muddassir'},
    '+17025427528',
    'Test_SMS',
    {
      name: 'muddassir'
    }
  );
  res.send(result);
};

exports.getPatientSavingSummary = async (req, res) => {
  const result = await smsService.getPatientSavingSummary(req.params);
  res.send(result);
};

exports.getPatientTimeDeductibleSummary = async (req, res) => {
  const result = await smsService.getPatientTimeDeductibleSummary(req.params);
  res.send(result);
};

exports.getPatientTimeOOPSummary = async (req, res) => {
  const result = await smsService.getPatientTimeOOPSummary(req.params);
  res.send(result);
};

exports.createScheduleJob = async (req, res) => {
  const date = new Date(2019, 7, 23, 17, 5, 0);
  const result = await cronService.scheduleJob(date, 'Test_Job');
  res.send(result);
};

exports.estimatePPIAndPrePay = async (req, res) => {
  const result = await patientService.estimatePPIAndPrePay(req.params);
  res.send(result);
};

exports.paymentGovtId = async (req, res) => {
  const result = await patientService.paymentGovtId(req.body);
  res.send(result);
};
