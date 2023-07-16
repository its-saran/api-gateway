import utils from '../utils/helper.js';

const errorHandler = async (req, res) => {
    const err = utils.createError({status: 404})
    res.status(err.error.status).json(err);
};
  
export default errorHandler;