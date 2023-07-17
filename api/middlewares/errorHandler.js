import { firestoreDb } from '../utils/firebase.js';
import utils from '../utils/helper.js';

const errorHandler = async (req, res) => {
    const err = utils.createError({status: 404})
    res.status(err.error.status).json(err);
    req.logData.gatewayRequest.error = err.error.message
    await firestoreDb.createDoc(req.logPath, req.id, req.logData)
};
  
export default errorHandler;