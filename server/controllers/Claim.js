const claimService = require('../services/claimService');

exports.getClaims = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'data has been fetched verified',
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
        isOutOfNetwork: false,
        isApprovedByPatient: false,
        approvedByPatientTime: null,
        providerGenratedId: 'ACBD1234',
        insuranceGenratedId: 'XYZ1234',
        dateOfServiceFrom: '2019-10-12',
        dateOfServiceTo: '2019-10-14',
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
        notes: 'Some notes',
        unbundlling: 'abcd',
        duplicate: 'abcd',
        billed: 'abcd',
        approved: 'abcd',
        contractAssignment: 'abcd',
        billingEntityNpi: 'abcd',
        BillingEntityId: 'abcd',
        isActive: true,
        isPaid: false,
        paidAmount: 50,
        balanceAmount: 100
      }
    ]
  });
  // const result = await claimService.addRecord(req.body);
  // res.send(result);
};

exports.addEstimated = async (req, res) => {
  // res.send({
  //   "status": "OK",
  //   "message": "Data submited successfully"
  // });
  const result = await claimService.addEstimatedClaim(req.body);
  res.send(result);
};

exports.addFinal = async (req, res) => {
  // res.send({
  //   "status": "OK",
  //   "message": "Data submited successfully"
  // });
  const result = await claimService.addFinalClaim(req.body);
  res.send(result);
};

exports.updateFinal = async (req, res) => {
  // res.send({
  //   "status": "OK",
  //   "message": "Data submited successfully"
  // });
  console.log('Claim - controller - updateFinal()');
  const result = await claimService.updateFinalClaim(req.body);
  res.send(result);
};

exports.updateEstimated = async (req, res) => {
  console.log('ClaimController -- updateEstimated()');
  // res.send({
  //   "status": "OK",
  //   "message": "Data submited successfully"
  // });
  const result = await claimService.updateEstimatedClaim(req.body);
  res.send(result);
};

exports.deleteEstimated = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'Data deleted successfully'
  });
  // const result = await claimService.deleteRecord(req.body);
  // res.send(result);
};

exports.search = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'data has been fetched verified',
    data: [
      {
        PatientId: 888,
        ProviderId: 999,
        claimType: 'Estimated',
        coPay: 12,
        deductible: 12,
        coInsurance: 12,
        selfPay: 12,
        total: 12,
        isOutOfNetwork: false,
        isApprovedByPatient: false,
        approvedByPatientTime: null,
        providerGenratedId: 'ACBD1234',
        insuranceGenratedId: 'XYZ1234',
        dateOfServiceFrom: '2019-10-12',
        dateOfServiceTo: '2019-10-14',
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
        notes: 'Some notes',
        unbundlling: 'abcd',
        duplicate: 'abcd',
        billed: 'abcd',
        approved: 'abcd',
        contractAssignment: 'abcd',
        billingEntityNpi: 'abcd',
        BillingEntityId: 'abcd',
        isActive: true,
        isPaid: false,
        paidAmount: 50,
        balanceAmount: 100
      }
    ]
  });
  // const result = await claimService.addRecord(req.body);
  // res.send(result);
};

exports.getSingleEstimatedClaim = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'data has been fetched verified',
    data: {
      PatientId: 888,
      ProviderId: 999,
      claimType: 'Estimated',
      coPay: 12,
      deductible: 12,
      coInsurance: 12,
      selfPay: 12,
      total: 12,
      isOutOfNetwork: false,
      isApprovedByPatient: false,
      approvedByPatientTime: null,
      providerGenratedId: 'ACBD1234',
      insuranceGenratedId: 'XYZ1234',
      dateOfServiceFrom: '2019-10-12',
      dateOfServiceTo: '2019-10-14',
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
      notes: 'Some notes',
      unbundlling: 'abcd',
      duplicate: 'abcd',
      billed: 'abcd',
      approved: 'abcd',
      contractAssignment: 'abcd',
      billingEntityNpi: 'abcd',
      BillingEntityId: 'abcd',
      isActive: true,
      isPaid: false,
      paidAmount: 50,
      balanceAmount: 100
    }
  });
  // const result = await claimService.addRecord(req.body);
  // res.send(result);
};

exports.getSingleFinalClaim = async (req, res) => {
  res.send({
    status: 'OK',
    message: 'data has been fetched verified',
    data: 
      {
        PatientId: 888,
        ProviderId: 999,
        claimType: 'Final',
        coPay: 12,
        deductible: 12,
        coInsurance: 12,
        selfPay: 12,
        total: 12,
        isOutOfNetwork: false,
        isApprovedByPatient: false,
        approvedByPatientTime: null,
        providerGenratedId: 'ACBD1234',
        insuranceGenratedId: 'XYZ1234',
        dateOfServiceFrom: '2019-10-12',
        dateOfServiceTo: '2019-10-14',
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
        notes: 'Some notes',
        unbundlling: 'abcd',
        duplicate: 'abcd',
        billed: 'abcd',
        approved: 'abcd',
        contractAssignment: 'abcd',
        billingEntityNpi: 'abcd',
        BillingEntityId: 'abcd',
        isActive: true,
        isPaid: false,
        paidAmount: 50,
        balanceAmount: 100
      }    
  });
  // const result = await claimService.addRecord(req.body);
  // res.send(result);
};
