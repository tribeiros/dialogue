const axios = require('axios');
const telegram = require('./config/telegram');

module.exports = function(message){
  axios
  .post(
    `${telegram.api}/bot${telegram.bot}/sendMessage`,
    {
      chat_id: telegram.chatId,
      text: message
    }
  )
  .then(response => {
    let now = new Date();
    console.log(`${now}\n${message}`);
    console.log('Message posted on telegram');
  })
  .catch(error => {
    console.log(' ');
    console.log('Error :', error);
  })
}