const ws = new WebSocket('wss://api.lanyard.rest/socket');
const discordurl = 'https://cdn.discordapp.com';
const uid = '470193291053498369';
const dstatus = document.querySelector('.right .statushead')
const astatus = document.querySelector('.right .activestatus')
const currentimg = document.querySelector('.game.current img')
const currentsongtxt = document.querySelector('.game.current .song')
const currentartisttxt = document.querySelector('.game.current .artist')


ws.onopen = console.log('WebSocket open!')
ws.onmessage = ({data: msg}) => {
  try {
    const data = JSON.parse(msg);
    console.log(data)
    switch (data.op) {
      case 1:
        ws.send(JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: uid
          }
        }));
        setInterval(() => {
          ws.send(JSON.stringify({
            op: 3
          }))
        }, data.d.heartbeat_interval);
        break
    }


    // idle: #f0b232
    // online: #23a55a
    // dnd: #f23f43
    // offline: #80848e

    switch (data.d.discord_status) {
      case 'idle':
        dstatus.innerHTML = `Currently ${data.d.discord_status}`;
        dstatus.className = 'statushead idle'
        break;
      case 'online':
        dstatus.innerHTML = `Currently ${data.d.discord_status}`;
        dstatus.className = 'statushead online'
        break;
      case 'dnd':
        dstatus.innerHTML = `Currently ${data.d.discord_status}`;
        dstatus.className = 'statushead dnd'
        break;
      case 'offline':
        dstatus.innerHTML = `Currently ${data.d.discord_status}`;
        dstatus.className = 'statushead offline'
        break;
      default:
        dstatus.innerHTML = `Currently ${data.d.discord_status}`;
        dstatus.className = 'statushead offline'
        dstatus.title = ''
        break;
    }

    if(!data.d.discord_status) {
      dstatus.title = 'websocket broke :('
      dstatus.innerHTML = 'currently offline'
    }


    if(data.d.listening_to_spotify === true){
      dstatus.innerHTML = 'Currently listening to Spotify';
      dstatus.className = 'statushead ingame'
      astatus.innerHTML = data.d.spotify.artist
      currentimg.src = data.d.spotify.album_art_url
      currentsongtxt.innerHTML = data.d.spotify.song
      currentartisttxt.innerHTML = data.d.spotify.artist
      if(data.d.spotify.track_id !== null) {
      } else {
      }
    } else {
    }

  } catch{}
}