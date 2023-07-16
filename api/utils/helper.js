import createError from 'http-errors';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';

const utils = {
    waitFor: delay => new Promise(resolve => setTimeout(resolve, delay)),
    shuffle: (array) => {
        for(let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    createError: ({status, message, details}) => {
        if (status && message && details)  {
            return { error: { status, message, details }}
        } else if (status && message && !details ) {
            return { error: { status, message }}
        } else if(status && !message && details) {
            const err = createError(status)
            return { error: { status: err.status, message: err.message, details }}
        } else if (status && !message && !details ) {
            const err = createError(status)
            return { error: { status: err.status, message: err.message }}
        }
    },
    time: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY h:mm:ss A'),
    timeMilli: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY h:mm:ss.SSS A'),
    timeId: () => moment().tz('Asia/Kolkata').format('YYYYMMDD-hhmmssSSS'),
    timeStamp: () => moment().tz('Asia/Kolkata').toISOString(),
    startTime: () => moment(),
    endTime: () => moment(),
    elapseTime : (startTime, endTime) => moment.duration(endTime.diff(startTime)).asSeconds(),
    logMessage : (id, message, consoleObject) => {
        console.log(`${utils.time()} | ${id} | ${message}`)
        consoleObject[utils.timeMilli()] = message
    },
    errorMessage : (id, message, consoleObject) => {
        console.error(`${utils.time()} | ${id} | ${message}`)
        consoleObject[utils.timeMilli()] = message
    },
    reqResMessage: (message, consoleObject) => {
        console.log(`${utils.time()} | ${message}`)
        consoleObject[utils.timeMilli()] = message
    },
    addId : (array, Idkey, Idvalue) => array.map(item => ({...item, [Idkey]: `${Idvalue}`})),
    addUniqueId : (array, Idkey, IdvaluePrefix) => array.map(item => ({...item, [Idkey]: `${IdvaluePrefix}`+`${uuidv4()}`})),
    addObjectInArray : (array, key, value) => array.map(item => ({...item, [key]: value}))
}

export default utils;




