const Config = require('./config.json');
const fetch = require('node-fetch');
const WebSocket = require('ws');
const ws = new WebSocket('wss://gateway.discord.gg/');
const { checkCode } = require('./onMessage.js');
let hbto;
let s = null;

ws.on('open', () => {
  console.log('OPEN WEBSOCKET');
});

ws.on('message', (message) => {
  const msg = JSON.parse(message);
  // checkCode(msg);
  if (msg.op == 10) {
    console.log('HELLO DISCORD');
    ws.send(
      `{"op": 2, "d": {"token": "Bot ${Config.token}", "properties": { "$os": "linux", "$browser": "my_library", "$device": "my_library"}}}`
    );
    hbto = msg.d.heartbeat_interval;
    setInterval(hb, hbto);
  } else if (msg.op == 0) {
    if (msg.t == 'READY') {
      console.log('READY EVENT');
      s = msg.s;
    } else if (msg.t == 'GUILD_CREATE') {
      // TO DO: ADD MORE STUFF
      console.log('GUILD_CREATE EVENT');
      s = msg.s;
    } else if (msg.t == 'PRESENCE_UPDATE') {
      console.log('PRESENCE_UPDATE EVENT');
      s = msg.s;
    } else if (msg.t == 'GUILD_MEMBER_UPDATE') {
      console.log('GUILD_MEMBER_UPDATE EVENT');
      s = msg.s;
    } else {
      console.log(msg);
      s = msg.s;
    }
  } else if (msg.op == 11) {
    console.log('HEARTBEAT BACK');
  } else {
    console.log(msg);
    s = msg.s;
  }
});

ws.on('close', () => {
  console.log('CLOSE WEBSOCKET');
});

async function hb() {
  ws.send(`{"op": 1, "d": ${s}}`);
  console.log('HEARTBEAT');
}
