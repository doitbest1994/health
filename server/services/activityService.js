const models = require('../models');
const installmentService = require('./installmentService.js');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const signup = payload => {
  return new Promise((resolve, reject) => {
    models.Activity.create({
      PatientId: payload.PatientId, ActivityTypeId: 2, // for ActivityTypeId for Signup Activity
      activityDate: moment().format('YYYY-MM-DD HH:ss'), service: 'Signup',
      coPay: 0, coInsurance: 0, selfPay: 0, charity: 0, buffer: 0, prepay: 0, ppi: 0,
      fees: payload.fees, deductible: 0, outOfPocketMax: 0, total: payload.fees, installments: 1,
      isCompleted: true
    })
      .then(returnObject => {
        installmentService.signup({
          ActivityId: returnObject.id, PatientId: payload.PatientId, amount: payload.fees, dueDate: moment().format('YYYY-MM-DD HH:ss')
        })
        .then(activityInstallment => {
          resolve({ status: 'OK', content: returnObject });
        })
        .catch(error => {
          reject({ status: "ERROR", content: error });
        });
      })
      .catch(error => {
        reject({ status: "ERROR", content: error });
      });
  });

};

const ppi = payload => {
  return new Promise((resolve, reject) => {
    models.Activity.create({
      PatientId: payload.PatientId, ActivityTypeId: 3, // for ActivityTypeId for PPI Activity
      activityDate: moment().format('YYYY-MM-DD HH:ss'), service: 'PPI',
      coPay: 0, coInsurance: 0, selfPay: 0, charity: 0, buffer: 0, prepay: 0, ppi: payload.ppi,
      fees: 0, deductible: 0, outOfPocketMax: 0, total: payload.ppi, installments: payload.installments
    })
      .then(returnObject => {
        installmentService.ppi({
          ActivityId: returnObject.id, PatientId: payload.PatientId, amount: payload.ppi, dueDate: moment().format('YYYY-MM-DD HH:ss')
        })
        .then(activityInstallment => {
          resolve({ status: 'OK', content: returnObject });
        })
        .catch(error => {
          reject({ status: "ERROR", content: error });
        });
      })
      .catch(error => {
        reject({ status: "ERROR", content: error });
      });
  });
}

const prepay = payload => {
  return new Promise((resolve, reject) => {
    models.Activity.create({
      PatientId: payload.PatientId, ActivityTypeId: 4, // for ActivityTypeId for Prepay Activity
      activityDate: moment().format('YYYY-MM-DD HH:ss'), service: 'Prepay',
      coPay: 0, coInsurance: 0, selfPay: 0, charity: 0, buffer: 0, prepay: payload.prepay, ppi: 0,
      fees: 0, deductible: 0, outOfPocketMax: 0, total: payload.prepay, installments: payload.installments
    })
      .then(returnObject => {
        models.ActivityInstallment.create({
          ActivityId: returnObject.id, PatientId: payload.PatientId,
          installmentNumber: 1, amount: payload.prepay, dueDate: moment().format('YYYY-MM-DD HH:ss'),
          isPaid: true
        })
        .then(activityInstallment => {
          resolve({ status: 'OK', content: returnObject });
        })
        .catch(error => {
          reject({ status: "ERROR", content: error });
        });
      })
      .catch(error => {
        reject({ status: "ERROR", content: error });
      });
  });
};

const estimatedClaim = payload => {
  return new Promise((resolve, reject) => {
    models.Activity.create({
      PatientId: payload.PatientId, ActivityTypeId: 5, // for ActivityTypeId for Estimated Claim Activity
      activityDate: moment().format('YYYY-MM-DD HH:ss'), service: payload.service,
      coPay: payload.coPay, coInsurance: payload.coInsurance, selfPay: payload.selfPay, charity: payload.charity, buffer: payload.buffer,
      prepay: payload.prepay, ppi: payload.ppi, fees: payload.fees, deductible: payload.deductible, outOfPocketMax: payload.outOfPocketMax,
      total: payload.total, installments: payload.installments
    })
      .then(returnObject => {
        var installmentAmolunt = parseFloat(payload.total) / parseFloat(payload.installments);
        models.ActivityInstallment.create({
          ActivityId: returnObject.id, PatientId: payload.PatientId,
          installmentNumber: 1, amount: installmentAmolunt.toFixed(2), dueDate: moment().format('YYYY-MM-DD HH:ss'),
          isPaid: false
        })
        .then(activityInstallment => {
          resolve({ status: 'OK', content: returnObject });
        })
        .catch(error => {
          reject({ status: "ERROR", content: error });
        });

        // resolve({ status: 'OK', content: returnObject });
      })
      .catch(error => {
        reject({ status: "ERROR", content: error });
      });
  });
};


const finalClaim = payload => {
  return new Promise((resolve, reject) => {
    models.Activity.create({
      PatientId: payload.PatientId, ActivityTypeId: 6, // for ActivityTypeId for Estimated Claim Activity
      activityDate: moment().format('YYYY-MM-DD HH:ss'), service: payload.service,
      coPay: payload.coPay, coInsurance: payload.coInsurance, selfPay: payload.selfPay, charity: payload.charity, buffer: payload.buffer,
      prepay: payload.prepay, ppi: payload.ppi, fees: payload.fees, deductible: payload.deductible, outOfPocketMax: payload.outOfPocketMax,
      total: payload.total, installments: payload.installments
    })
      .then(returnObject => {
        var installmentAmolunt = parseFloat(payload.total) / parseFloat(payload.installments);
        models.ActivityInstallment.create({
          ActivityId: returnObject.id, PatientId: payload.PatientId,
          installmentNumber: 1, amount: installmentAmolunt.toFixed(2), dueDate: moment().format('YYYY-MM-DD HH:ss'),
          isPaid: false
        })
        .then(activityInstallment => {
          resolve({ status: 'OK', content: returnObject });
        })
        .catch(error => {
          reject({ status: "ERROR", content: error });
        });

        // resolve({ status: 'OK', content: returnObject });
      })
      .catch(error => {
        reject({ status: "ERROR", content: error });
      });
  });
};



module.exports = {
  signup, ppi, prepay, estimatedClaim, finalClaim
};
