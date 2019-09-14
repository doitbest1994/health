const express = require('express');
const { validateBody } = require('../middleware/validator');
const safeAsync = require('../middleware/asyncController');
const router = express.Router();

const { getClaimsDataSet, addEstimatedDataSet, updateEstimatedDataSet, deleteEstimatedDataSet, addFinalDataSet, updateFinalDataSet
} = require('../validators/claim');

const { getClaims, addEstimated, updateEstimated, deleteEstimated, addFinal, updateFinal, search, getSingleEstimatedClaim, getSingleFinalClaim
} = require('../controllers/Claim.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// method = GET
// endpoint = claim/list
router.get('/list', validateBody(getClaimsDataSet), safeAsync(getClaims));
// method = POST
// endpoint = claim/estimated
router.post('/estimated', validateBody(addEstimatedDataSet), safeAsync(addEstimated));
// method = PUT
// endpoint = claim/estimated
router.put('/estimated', validateBody(updateEstimatedDataSet), safeAsync(updateEstimated));
// method = DELETE
// endpoint = claim/estimated
router.delete('/estimated', validateBody(deleteEstimatedDataSet), safeAsync(deleteEstimated));
// method = POST
// endpoint = claim/estimated
router.post('/final', validateBody(addFinalDataSet), safeAsync(addFinal));
// method = POST
// endpoint = claim/estimated
router.put('/final', validateBody(updateFinalDataSet), safeAsync(updateFinal));
// method = GET
// endpoint = claim/search
router.get('/search', safeAsync(search));
//router.get('/search', validateBody(getClaimsDataSet), safeAsync(getClaims));

// method = POST
// endpoint = claim/estimated
router.post('/final', validateBody(addFinalDataSet), safeAsync(addFinal));

// method = GET
// endpoint = claim/estimated-claim?PatientId=123&claimId=1
router.post('claim/estimated-claim', safeAsync(getSingleEstimatedClaim));

// method = GET
// endpoint = claim/final-claim?PatientId=123&claimId=1
router.post('claim/final-claim', safeAsync(getSingleFinalClaim));


module.exports = router;