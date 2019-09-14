const models = require('../models');
// const patientCreditCardService = require('./providerEntityService');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const signup = payload => {
  return new Promise((resolve, reject) => {
    addRecord({
      ActivityId: payload.ActivityId, PatientId: payload.PatientId,
      installmentNumber: 1, amount: payload.amount, dueDate: pyaload.dueDate,
      isPaid: true
    })
    .then(activityInstallment => {
      resolve({ status: 'OK', content: activityInstallment.content });
    })
    .catch(error => {
      reject({ status: "ERROR", content: error });
    });
  });
};


const ppi = payload => {
  return new Promise((resolve, reject) => {
    addRecord({
      ActivityId: payload.ActivityId, PatientId: payload.PatientId,
      installmentNumber: 1, amount: payload.amount, dueDate: moment().format('YYYY-MM-DD HH:ss'),
      isPaid: true
    })
    .then(activityInstallment => {
      resolve({ status: 'OK', content: activityInstallment.content });
    })
    .catch(error => {
      reject({ status: "ERROR", content: error });
    });
  });
};


const prepay = payload => {
  return new Promise((resolve, reject) => {
    addRecord({
      ActivityId: payload.ActivityId, PatientId: payload.PatientId,
      installmentNumber: 1, amount: payload.amount, dueDate: moment().format('YYYY-MM-DD HH:ss'),
      isPaid: true
    })
    .then(activityInstallment => {
      resolve({ status: 'OK', content: activityInstallment.content });
    })
    .catch(error => {
      reject({ status: "ERROR", content: error });
    });
  });
};


const estimatedClaim = payload => {
  return new Promise((resolve, reject) => {
    addRecord({
      ActivityId: returnObject.id, PatientId: payload.PatientId,
      installmentNumber: 1, amount: amount, dueDate: moment().format('YYYY-MM-DD HH:ss'),
      isPaid: true
    })
    .then(activityInstallment => {
      resolve({ status: 'OK', content: activityInstallment.content });
    })
    .catch(error => {
      reject({ status: "ERROR", content: error });
    });
  });
};


const addRecord = payload => {
  return new Promise((resolve, reject) => {
    models.ActivityInstallment.create({
      ActivityId: payload.ActivityId, PatientId: payload.PatientId,
      installmentNumber: 1, amount: payload.amount, dueDate: payload.dueDate,
      isPaid: payload.isPaid
    })
      .then(returnObject => {
        resolve({ status: 201, message: 'Record has been added', content: returnObject });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const markInActive = payload => {
  return new Promise((resolve, reject) => {
console.log("in markInActive for ActivityId: "+ payload.ActivityId)
    models.ActivityInstallment.update(
        {isActive: false}, //what going to be updated
        { where: { ActivityId: payload.ActivityId }} // where clause
    )
      .then(returnObject => {
        resolve({ status: 201, message: 'Record has been updated', content: returnObject });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

module.exports = {
  signup, ppi, prepay, estimatedClaim,
  addRecord, markInActive
};
