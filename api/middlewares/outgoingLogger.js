// import morgan from 'morgan'
// import utils from '../utils/helper.js'
// // import { firestoreDb } from '../utils/firebase.js';

// const formatMessage = (tokens, req, res) => {

//     let consoleLog = req.consoleLog
//     const referenceId = req.id
//     const requestTime = req.time
//     const requestIp = tokens['remote-addr'](req, res)
//     const requestMethod = tokens.method(req, res)
//     const requestUrl = tokens.url(req, res)
//     const requestUserAgent = tokens['user-agent'](req, res);
//     // const serviceType = req.serviceType
//     const totalTime = parseFloat(tokens['total-time'](req, res) / 1000).toFixed(2);
//     const responseTime = utils.time()
//     const responseStatus = tokens.status(req, res) || 'unknown'
//     const responseContentLength = tokens.res(req, res, 'content-length') || 0
//     // const errorMessage = (message) => utils.errorMessage(referenceId, message, consoleLog);

//     // const requestLog = {
//     //     time: requestTime,
//     //     method: requestMethod,
//     //     ip: requestIp,
//     //     url: requestUrl,
//     //     userAgent: requestUserAgent
//     // }
//     // const defaultServiceLog = {
//     //     serviceType: serviceType,
//     //     searchQuery: 'Not given',
//     //     proxyInfo:  'unknown',
//     //     totalJobs:  0
//     // }
//     // const responseLog = {
//     //     time: responseTime,
//     //     status: responseStatus,
//     //     contentLength: responseContentLength,
//     //     totalTime
//     // }

//     const outgoingLog = `Response | Reference ID: ${referenceId} | Status: ${responseStatus} | Content Length: ${responseContentLength} bytes | Response Time: ${totalTime} s`;
//     utils.reqResMessage(outgoingLog, consoleLog)

//     // const logDetails = {
//     //     referenceId,
//     //     request: requestLog,
//     //     service: req.serviceLog || defaultServiceLog,
//     //     response: responseLog,
//     //     console: consoleLog
//     // }

//     // try {
//     //     firestore.create(`Logs`, logDetails, referenceId)
//     // } 
//     // catch (error) {
//     //     errorMessage(`Error creating log`)
//     // }
// };

// const outgoingLogger = morgan(formatMessage);
// export default outgoingLogger;


import morgan from 'morgan';
import utils from '../utils/helper.js';

const formatMessage = (config, tokens, req, res) => {
    const serviceName = config.serviceName;
    const consoleLogs = req.consoleLogs;
    const referenceId = req.id;
    const totalTime = parseFloat(tokens['total-time'](req, res) / 1000).toFixed(2);
    const responseStatus = tokens.status(req, res) || 'unknown';
    const responseContentLength = tokens.res(req, res, 'content-length') || 0;
    const memoryUsage = (process.memoryUsage().rss / (1024 * 1024)).toFixed(2); // Get memory usage in megabytes with 2 decimal places
    const outgoingLog = `Response | Reference ID: ${referenceId} | Status: ${responseStatus} | Content Length: ${responseContentLength} bytes | Response Time: ${totalTime} s | Memory Usage: ${memoryUsage} MB`;
    utils.reqResMessage(serviceName, outgoingLog, consoleLogs);
};

const outgoingLogger = (config) => morgan(formatMessage.bind(null, config));

export default outgoingLogger;

