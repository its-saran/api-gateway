import utils from '../utils/helper.js';
import { firestoreDb } from '../utils/firebase.js';

const authenticator = async (req, res, next) => {
    const apiKey = req.query.apikey;
    const apikeys = await firestoreDb.getDocIds('Keys')

    if (!apiKey || !apikeys.includes(apiKey)) {
        const err = utils.createError({ status: 401 });
        res.status(err.error.status).json(err);
        req.logData.gatewayRequest.error = err.error.message
        await firestoreDb.createDoc(req.logPath, req.id, req.logData)
    } else {
        req.logData.gatewayRequest.authentication = "success";
        await firestoreDb.createDoc(req.logPath, req.id, req.logData)
        next();
    }
};
  
export default authenticator




  