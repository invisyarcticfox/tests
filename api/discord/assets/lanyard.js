const APIRUL = 'https://api.lanyard.rest/v1/users/'
const DISCCDN = 'https://cdn.discordapp.com'
const USERID = '470193291053498369'
const pfp = document.getElementById('pfp')
const statdot = document.getElementById('statusdot')
const tooltipstatus = document.querySelector('.status.tooltiptext')

const customstatus = document.getElementById('status')
const statusimg = document.querySelector('.statusimg')
const statustxt = document.querySelector('#status span')

const globnametxt = document.getElementById('globalname')
const usernametxt = document.getElementById('username')
const useridtxt = document.querySelector('.userid')

const spotifyinfocont = document.querySelector('.spotifycont')
const spotifyicon = document.querySelector('.spotifyicon')
const spotifylink = document.querySelector('.spotifylink')
const spotifytt = document.querySelector('.spotifylink .tooltiptext')
const albumart = document.getElementById('albumart')
const songtitle = document.getElementById('songtitle')
const songartist = document.getElementById('songartist')
const songalbum = document.getElementById('songalbum')

async function fetchResponse(USERID) {
  try {
    const res = await fetch(APIRUL+USERID)
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}


async function setAvatar() {
  const {
    data: {
      discord_user: {
        avatar
      }
    }
  } = await fetchResponse(USERID)
  const avaturl = `${DISCCDN}/avatars/${USERID}/${avatar}?size=512`
  pfp.src = avaturl
}

async function setStatus() {
  const {
    data: {
      activities,
      discord_status,
      listening_to_spotify
    }
  } = await fetchResponse(USERID)
  switch (discord_status) {
    case 'online':
      statdot.style.background = '#3ba45d'
      tooltipstatus.innerHTML = 'Online'
      break
    case 'dnd':
      statdot.style.background = '#ed4245'
      tooltipstatus.innerHTML = 'Do Not Disturb'
      break
    case 'idle':
      statdot.style.background = '#faa81a'
      tooltipstatus.innerHTML = 'Idle'
      break
    case 'offline':
      statdot.style.background = '#747e8c'
      tooltipstatus.innerHTML = 'Offline'
      break
  }

  if(listening_to_spotify == true) {
    spotifyinfocont.style.display = "block"
  } else {
    spotifyinfocont.style.display = ""
    return
  }
}

// ill do custom status later

async function setProfileInfo() {
  const {
    data: {
      discord_user: {
        id,
        username,
        global_name
      }
    }
  } = await fetchResponse(USERID)
  globnametxt.insertAdjacentHTML('beforeend', global_name)
  usernametxt.insertAdjacentHTML('beforeend', `@${username}`)
  useridtxt.insertAdjacentHTML('afterbegin', id)
}

async function setSpotifyInfo() {
  const {
    data: {
      spotify
    }
  } = await fetchResponse(USERID)

  if(spotify === null) {
    return
  } else {
    const {
      data: {
        spotify: {
          track_id,
          album,
          album_art_url,
          artist,
          song
        }
      }
    } = await fetchResponse(USERID)
    albumart.src = album_art_url
    songtitle.innerHTML = `<b>${song}</b>`
    songartist.innerHTML = `by ${artist}`
    songalbum.innerHTML = `on ${album}`
    spotifylink.href = `spotify://track/${track_id}`
    spotifylink.style.opacity = "1"
    spotifylink.style.cursor = ""

    if(album_art_url === null, track_id === null) {
      albumart.src = './assets/img/spotify.png'
      spotifylink.style.opacity = ""
      spotifylink.style.cursor = "default"
      spotifylink.removeAttribute("href")
    }
  }
}


function invoke() {
  console.log(APIRUL+USERID)
  setInterval(() => {
    setStatus()
    // setCustomStatus()
    setSpotifyInfo()
  }, 1000)
  setAvatar()
  setProfileInfo()
}
invoke()