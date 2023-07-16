import utils from '../utils/helper.js';
const API_KEY = '123';

const authenticate = (req, res, next) => {
    const apiKey = req.query.apikey;
  
    if (!apiKey || apiKey !== API_KEY) {
        const err = utils.createError({status: 401})
        res.status(err.error.status).json(err);
    }
    next();
};
  
export default authenticate
  