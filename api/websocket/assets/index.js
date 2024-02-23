const ws = new WebSocket("wss://api.lanyard.rest/socket");
const statind = document.querySelector('.statind')
const stattxt = document.querySelector('.stattxt')
const spotifytxt = document.querySelector('.spotify')
var spotifyimg = document.querySelector('.cover')
var spotifyinfo = document.querySelectorAll('#spotifyinfo .info div')
const localfile = document.querySelector('.localfile')


ws.onopen = console.log;
ws.onmessage = ({ data: msg }) => {

  try {
    const data = JSON.parse(msg);
    console.log(data);
    switch (data.op) {
      case 1:
        ws.send(JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: "470193291053498369"
          }
        }));
        setInterval(() => {
          ws.send(JSON.stringify({
            op: 3
          }))
        }, data.d.heartbeat_interval);
        break;
    }

    // idle: #f0b232
    // online: #23a55a
    // dnd: #f23f43
    // offline: #80848e
    switch(data.d.discord_status) {
      case "idle":
        statind.style.background = "#f0b232";
        stattxt.innerHTML = "idle"
        break;
      case "online":
        statind.style.background = "#3ba55c";
        stattxt.innerHTML = "online"
        break;
      case "dnd":
        statind.style.background = "#ed4245";
        stattxt.innerHTML = "do not disturb"
        break;
      case "offline":
        statind.style.background = "#747f8d";
        stattxt.innerHTML = "offline"
        spotifytxt.style.display = "none"
        break;
      default: statind.style.background = "#f0b232";
    }
    
    if(data.d.listening_to_spotify === true) {
      spotifytxt.innerHTML = "i am listening to spotify! :)"
    } else {
      spotifytxt.innerHTML = "i am not listening to spotify! :("
    }

    if(data.d.spotify.album_art_url === null) {
      localfile.style.display = "block"
      return
    } else {
      spotifyimg.src = data.d.spotify.album_art_url
      localfile.style.display = "none"
    }
    spotifyinfo[0].innerHTML = data.d.spotify.song
    spotifyinfo[1].innerHTML = `<i>${data.d.spotify.album}</i>`
    spotifyinfo[2].innerHTML = `<b>${data.d.spotify.artist}</b>`

  } catch {}
};

ws.onclose = console.info;
ws.onerror = console.error;