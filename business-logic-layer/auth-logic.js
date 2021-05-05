const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");


//register
async function registerAsync(user) {
  user.password = cryptoHelper.hash(user.password);
  const sql = "INSERT INTO users VALUES(Default ,?, ?, ?, ?, ?, ?, ?, Default)";
  const info = await dal.executeAsync(sql, [
    user.id,
    user.username,
    user.password,
    user.firstName,
    user.lastName,
    user.street,
    user.city,
    user.isAdmin
  ]);
  user.userId = info.insertId;
  delete user.password;
  delete user.id;

  user.token = jwtHelper.getNewToken({ user });
  return user;
}

//check duplicate user or id
async function getDuplicateAsync(value) {
    const sql = `select * from users where id = '${value}' or username = '${value}'`
    const result = await dal.executeAsync(sql)
    if(result.length === 0){
        return false
    }
    else return true
    
}

//login
async function loginAsync(credentials) {
  credentials.password = cryptoHelper.hash(credentials.password);
  const sql = `SELECT userId ,username ,isAdmin,firstName,lastName, city, street from users WHERE username = ? AND password = ?`;
  const users = await dal.executeAsync(sql, [
    credentials.username,
    credentials.password,
  ]);
  if (users.length === 0) return null;
  const user = users[0];
  user.token = jwtHelper.getNewToken({ user });
  return user;
}


module.exports = {
registerAsync,
  loginAsync,
  getDuplicateAsync
};
