const jwt = require('jsonwebtoken');
const { getProfilDevById } = require ('../models/developers');
const { getOneCompany } = require ('../models/compagnies');

const jwtSecret = 'MatteoLeBg';

const authorizeDev = (req, res, next) => {
  const token = req.get('authorization');
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log('decoded', decoded);
    const { id } = decoded;
    const { isDev } = decoded;
    

    const existingUser = getProfilDevById(id);
    
    if (!existingUser) return res.sendStatus(401);
    if (!isDev) return res.sendStatus(401);

    req.user = {id:id, isDev:isDev}; // request.user object is available in all other middleware functions
    return next();
  } catch (err) {
    console.error('authorize: ', err);
    return res.sendStatus(401);
  }
};

const authorizeComp = (req, res, next) => {
  const token = req.get('authorization');
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log('decoded', decoded);
    const { id } = decoded;
    const { isDev } = decoded;
    

    const existingUser = getOneCompany(id);
    
    if (!existingUser) return res.sendStatus(401);
    if (isDev) return res.sendStatus(401);

    req.user = {id:id, isDev:isDev}; // request.user object is available in all other middleware functions
    return next();
  } catch (err) {
    console.error('authorize: ', err);
    return res.sendStatus(401);
  }
};

module.exports = { authorizeDev, authorizeComp };
