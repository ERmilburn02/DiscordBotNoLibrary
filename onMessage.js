export function checkCode(msg) {
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
}
