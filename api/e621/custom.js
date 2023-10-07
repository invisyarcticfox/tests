const APIURL = 'https://e621.net'
const USERID = '685299'
const PFPID = '4121728'
const pfp = document.getElementById('pfp')
const pfpurl = document.querySelector('a.pfpurl')
const usernametxt = document.getElementById('username')
const useridtxt = document.getElementById('id')
const favcount = document.getElementById('favcount')
const commcount = document.getElementById('commcount')
const memlevel = document.getElementById('memlevel')


async function fetchProfileInfo(USERID) {
  try {
    const res = await fetch(`${APIURL}/users/${USERID}.json`)
    return await res.json();
  } catch (err) {
    console.error(err)
  }
}
async function fetchAvatarURL(PFPID) {
  try {
    const res = await fetch(`${APIURL}/posts/${PFPID}.json`)
    return await res.json();
  } catch (err) {
    console.error(err)
  }
}


async function setAvatar() {
  const {
    post: {
      id,
      sample: {
        url
      }
    }
  } = await fetchAvatarURL(PFPID)
  pfp.src = url
  pfp.title = `#`+id
}

async function setProfileInfo() {
  const {
    name,
    id
  } = await fetchProfileInfo(USERID)
  usernametxt.innerHTML = name
  useridtxt.innerHTML = id
  pfpurl.href = `${APIURL}/users/${name}`
}

async function setStats() {
  const {
    comment_count,
    favorite_count,
    level_string
  } = await fetchProfileInfo(USERID)
  commcount.innerHTML = comment_count
  favcount.innerHTML = favorite_count
  memlevel.innerHTML = level_string
}


function invoke() {
  console.log(`${APIURL}/users/${USERID}.json`)
  setProfileInfo()
  setStats()
  setAvatar()
}
invoke()