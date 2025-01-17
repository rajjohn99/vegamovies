// config/config.js
require('dotenv').config();

module.exports = {
    IG_PRO_USER_ID: process.env.IG_PRO_USER_ID,
    INSTAGRAM_USER_ACCESS_TOKEN: process.env.INSTAGRAM_USER_ACCESS_TOKEN,
    WEBHOOK_URL: process.env.WEBHOOK_URL,
};