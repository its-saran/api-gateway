import utils from '../utils/helper.js'
import { firestoreDb } from '../utils/firebase.js';

const incomingLogger = (config) => async (req, res, next) => {
    req.time = utils.time()
    req.consoleLogs = {}
    req.logData = {
        gatewayRequest: {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            service: 'Unknown',
            serviceType: 'Unknown',
            apiType: 'Unknown'
        }
    }
    let idSuffix = '-UNK'
    let apiType
    let service

    const serviceName = config.serviceName
    const endpoint = Object.keys(config.Endpoints).find(key => req.url.includes(key));

    if (endpoint) {
        const endpointData = config.Endpoints[endpoint];
        req.logData.gatewayRequest.serviceType  = endpointData.serviceType;
        req.logData.gatewayRequest.service  = endpointData.service;
        req.logData.gatewayRequest.apiType = endpointData.apiType;
        idSuffix = endpointData.idSuffix;
    }

    req.id = utils.timeId() + idSuffix
    apiType= utils.capitalizeString(req.logData.gatewayRequest.apiType)
    service = utils.capitalizeString(req.logData.gatewayRequest.service)
    req.logPath = `Logs/${service}/${apiType}Logs`

    await firestoreDb.createDoc(req.logPath, req.id, req.logData)
    const requestLog = `Request | Reference ID: ${req.id} | Method: ${req.method} | URL: ${req.originalUrl} | IP: ${req.ip} `
    utils.reqResMessage(serviceName, requestLog, req.consoleLogs)

    next();
};
  
export default incomingLogger;




