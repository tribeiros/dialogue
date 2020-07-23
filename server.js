// require npm
const express = require('express');
const app = express();
const axios = require('axios');
const request = require('request');

//require local
const postMessage = require('./postMessage')

// Properties
const settings = require('./config/settings');
const domains = require('./config/domains');

// Main function
function main(){
  domains.forEach(domain => {
    request.get({url: `http://${domain}:${settings.client.port}${settings.client.endpoint}`}, function (error, response, body) {
      if(error){
        message = `${domain}: ${error.code}`
        postMessage(message)
      } else if (response.statusCode != 200) {
        message = `${domain}: ${response.statusCode}`
        postMessage(message)
      }
    });
  })
  setTimeout(main, settings.server.loop)
}

// Call
main();

app.listen(settings.server.port, function () {
  console.log(`Server running on port ${settings.server.port}`);
});
