const ws = new WebSocket("wss://api.lanyard.rest/socket");

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
  } catch { }
};

ws.onclose = console.info;
ws.onerror = console.error;