const PORT = process.env.port || 5000;
const JWTTOKEN = process.env.jwttoken || "secret";
const MAIL_ID = process.env.mail_id || 'sam@blockchainappfactory.com';
const PASSWORD = process.env.password || 'Josh@12345';
const HOST = `http://localhost`;




module.exports = {
    PORT,
    JWTTOKEN
}