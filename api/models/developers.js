/* eslint-disable spaced-comment */
/* eslint-disable no-console */

const client = require('../connection');

const getAllDevelopers = async () =>
  new Promise((resolve, reject) => {
    client.query(
      `SELECT dev.id_developer,
    dev.lastname,
    dev.firstname,
    dev.mail,
    dev.birth_date,
    dev.tel,
    tof.type_offer AS offer_required
    FROM webproject.developers dev,
    webproject.type_offers tof
    WHERE dev.type_offer_required= tof.id_type_offer`,
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          console.log('erreur ', err.message);
          reject(err.message);
        }
      },
    );
  });

const getDevByMail = async (mail) =>
  new Promise((resolve, reject) => {
    const select = `SELECT mail , password FROM webproject.developers where mail = $1`;
    client.query(select, [mail], (err, result) => {
      if (err) {
        reject(err.message);
        console.log(err.message);
      } else if (result.rowCount !== 0) {
          resolve(result.rows[0]);
        } else {
          console.log('User not found');
          
        }
    });
  });


  async function login(mail, password) {
    const userFound = getDevByMail(mail);
    if (!userFound) return undefined;
  
    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) return undefined;
  
    const token = jwt.sign(
      { username }, // session data added to the payload (payload : part 2 of a JWT)
      jwtSecret, // secret used for the signature (signature part 3 of a JWT)
      { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
    );
  
    const authenticatedUser = {
      mail,
      token,
    };
  
    return authenticatedUser;
  }



module.exports = { getAllDevelopers, getDevByMail };
