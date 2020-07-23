// require
const express = require('express');
const app = express();
const checkDiskSpace = require('check-disk-space');
const axios = require('axios');
const os = require("os");
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore'
});

subprocess.unref();

//require local
const postMessage = require('./postMessage')

// Properties
const settings = require('./config/settings');

// Modules
function diskModule(){
  checkDiskSpace(settings.disk.path).then((diskSpace) => {
    let now = new Date();//.toUTCString();
    let percent = diskSpace.free /  diskSpace.size * 100; // calc percent
    let intPercent = Math.trunc( percent ); // turn to integer
    let percentDigit = percent.toFixed(0);
    let message = `${settings.server.hostname}\ndisk free: ${percentDigit}%`
    console.log(message)
    if ( intPercent <= settings.disk.threshold ){
      postMessage(message)
    }
  })
  setTimeout(diskModule, settings.disk.loop);
}

function memModule(){
  let now = new Date();
  let free = os.freemem();
  let total = os.totalmem();
  let percent = free / total * 100 - 100;
  let posPercent = Math.abs(percent)
  let intPercent = Math.trunc( posPercent );
  let message = `mem free: ${intPercent}%`
  if ( intPercent <= settings.mem.threshold ){
    postMessage(message)
  } else {
    console.log(`\n${now}\n${message}`)
  }
  setTimeout(memModule, settings.mem.loop);
}

function cpuModule(){
  setTimeout(cpuModule, settings.cpu.loop);
}

// call
diskModule();
//memModule();
//cpuModule();

// api
app.get('/monitoring', function (req, res) {
  res.send('receive');
});

app.listen(settings.client.port, function () {
  console.log(`Client listening on port ${settings.client.port}`);
});
