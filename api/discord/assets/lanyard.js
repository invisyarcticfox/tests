const ws = new WebSocket('wss://api.lanyard.rest/socket');
const discordurl = 'https://cdn.discordapp.com';
const uid = '470193291053498369';

const pfp = document.querySelector('#pfp')

const statusdot = document.querySelector('#statusdot')
const statustt = document.querySelector('.status.tooltiptext')
const statusimg = document.querySelector('.statusimg')
const statustxt = document.querySelector('.statustxt')

const globalname = document.querySelector('#globalname')
const username = document.querySelector('#username')
const userid = document.querySelector('.userid')

const spotifycont = document.querySelector('.spotifycont')
const spotifycover = document.querySelector('#albumart')
const spotifylink = document.querySelector('.spotifylink')
const songtitle = document.querySelector('#songtitle b')
const songartist = document.querySelector('#songartist i')
const songalbum = document.querySelector('#songalbum i')

const activitycont = document.querySelector('.activitycont')
const activityimg = document.querySelector('#activityimg')
const activitylink = document.querySelector('.twitchlink')
const activityname = document.querySelector('#activityname b')
const activityname2 = document.querySelector('#activityname2 i')
const activityname3 = document.querySelector('#activityname3 i')

// ===========================================================

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

    // pfp and status and info
    pfp.src = discordurl+'/avatars/'+uid+'/'+data.d.discord_user.avatar+'?size=512';
    statustt.innerText = data.d.discord_status
    switch (data.d.discord_status) {
      case 'idle':
        statusdot.style.backgroundColor = '#f0b232'
        break;
      case 'online':
        statusdot.style.backgroundColor = '#23a55a'
        break;
      case 'dnd':
        statusdot.style.backgroundColor = '#f23f43'
        break;
      case 'offline':
        statusdot.style.backgroundColor = '#80848e'
        break;
    
      default:
        statusdot.style.backgroundColor = '#80848e'
        break;
    }

    const customstatus = data.d.activities.filter(m => m.type !== '4').shift()
    if(!customstatus.emoji.id) {
      statustxt.innerText = customstatus.emoji.name + customstatus.state
      statusimg.setAttribute('hidden', '')
    } else {
      statusimg.removeAttribute('hidden')
      statusimg.src = 'https://cdn.discordapp.com/emojis/'+customstatus.emoji.id
      statustxt.innerText = customstatus.state
    }

    globalname.innerText = data.d.discord_user.global_name
    username.innerText = `@${data.d.discord_user.username}`

    // spotify
    if(data.d.spotify !== null) {
      spotifycont.style.display = 'block'

      if(data.d.spotify.album_art_url !== null) {
        spotifycover.src = data.d.spotify.album_art_url
        spotifylink.setAttribute('href', '')
        spotifylink.href = 'spotify://track/'+data.d.spotify.track_id
        spotifylink.style.opacity = '1'
      } else {
        spotifycover.src = './assets/img/spotify.png'
        spotifylink.removeAttribute('href')
        spotifylink.removeAttribute('style')
      }

      songtitle.innerText = data.d.spotify.song
      songartist.innerText = data.d.spotify.artist
      songalbum.innerText = data.d.spotify.album
    } else {
      spotifycont.style.display = 'none'
    }

    // other activity
    const activitystatus = data.d.activities.filter(m => m.type !== '4').pop()
    console.log(activitystatus)
    if(activitystatus.name === 'Twitch') {
      activitycont.style.display = 'block'
      activityname.innerText = activitystatus.name
      activityname2.innerText = activitystatus.details
      activityname3.innerText = activitystatus.state
      activitylink.href = `https://twitch.tv/${activitystatus.state}`

      const largeimagesplit = activitystatus.assets.large_image.split('https/')[1]
      activityimg.src = 'https://'+largeimagesplit
    } else {
      activitycont.style.display = 'none'
    }

  } catch{}
}