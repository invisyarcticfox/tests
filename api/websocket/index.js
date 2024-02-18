const ws = new WebSocket("wss://api.lanyard.rest/socket");
const idleindicator = document.querySelector('.idle')
const spotifytxt = document.querySelector('.spotify')
const spotifynotxt = document.querySelector('.spotifyno')

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

    switch(data.d.discord_status) {
      case "idle": idleindicator.style.background = "#f0b232"
        break;
      case "online": idleindicator.style.background = "#3ba55c"
        break;
      case "dnd": idleindicator.style.background = "#ed4245"
        break;
      case "offline":
        idleindicator.style.background = "#747f8d"
        spotifytxt.style.display = "none"
        spotifynotxt.style.display = "none"
        break;
      default: idleindicator.style.background = "#747f8d";
    }
    
    if(data.d.listening_to_spotify === true) {
      spotifytxt.style.display = "block"
      spotifynotxt.style.display = "none"
    } else {
      spotifytxt.style.display = "none"
      spotifynotxt.style.display = "block"
    }

  } catch {}
};

ws.onclose = console.info;
ws.onerror = console.error;