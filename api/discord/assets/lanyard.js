const APIRUL = 'https://api.lanyard.rest/v1/users/'
const DISCCDN = 'https://cdn.discordapp.com'
const USERID = '470193291053498369'
const pfp = document.getElementById('pfp')
const statdot = document.getElementById('statusdot')
const globnametxt = document.getElementById('globalname')
const usernametxt = document.getElementById('username')
const useridtxt = document.getElementById('userid')
const spotifyicon = document.querySelector('.spotifyicon')

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
      discord_status,
      listening_to_spotify
    }
  } = await fetchResponse(USERID)
  switch (discord_status) {
    case 'online':
      statdot.style.background = '#3ba45d'
      statdot.title = 'Onlie'
      break
    case 'dnd':
      statdot.style.background = '#ed4245'
      statdot.title = 'Do Not Disturb'
      break
    case 'idle':
      statdot.style.background = '#faa81a'
      statdot.title = 'Idle'
      break
    case 'offline':
      statdot.style.background = '#747e8c'
      statdot.title = 'Offline'
      break
  }
  if (!listening_to_spotify != true) {
    spotifyicon.style.opacity = "1"
  }
  if (!listening_to_spotify != false) {
    spotifyicon.style.opacity = "0"
  }
}

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
  globnametxt.innerHTML = global_name
  usernametxt.innerHTML = `@${username}`
  useridtxt.innerHTML = id
}


function invoke() {
  console.log(APIRUL+USERID)
  setInterval(() => {
    setStatus()
  }, 1000)
  setAvatar()
  setProfileInfo()
}
invoke()