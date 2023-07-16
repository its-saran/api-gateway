import utils from '../utils/helper.js'
// import { firestoreDb } from '../utils/firebase.js';

const incomingLogger = (req, res, next) => {
    req.time = utils.time()
    req.serviceType
    req.consoleLog = {}
    if (req.url.includes('/api/search')) {
        req.id = utils.timeId() + '-N-SEA' 
        req.serviceType = 'search'
    } else if(req.url.includes('/api/scrape')) {
        req.id = utils.timeId() + '-N-SCR'
        req.serviceType = 'scrape'
    } else {
        req.id = utils.timeId() + '-N-UNK'
        req.serviceType = 'unknown'
    }
    req.consoleLogs = {}
    const requestLog = `Request | Reference ID: ${req.id} | Method: ${req.method} | URL: ${req.originalUrl} | IP: ${req.ip} `
    utils.reqResMessage(requestLog, req.consoleLog)
    next();
};
  
export default incomingLogger;