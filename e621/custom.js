const API_URL = 'https://e621.net'
const USERID = '685299'
const PFPID = '4121728'
const pfp = document.querySelector('#pfp')
const username = document.querySelector('#username')


async function fetchAvatarURL() {
  try {
    const res = await fetch(`${API_URL}/posts/${PFPID}.json`)
    return await res.json();
  } catch (err) {
    console.error(err)
  }
}
async function fetchProfileInfo() {
  try {
    const res = await fetch(`${API_URL}/users/${USERID}.json`)
    return await res.json();
  } catch (err) {
    console.error(err)
  }
}

async function setAvatar() {
  const {
    post: {
      sample: {
        url
      }
    }
  } = await fetchAvatarURL()
  console.log(url)
  pfp.src = url
}
async function setUsername() {
  const {
    name
  } = await fetchProfileInfo()
  console.log(name)
  username.innerHTML = name
}


function invoke() {
  setInterval(() => {

  }, 1000)
  setAvatar()
  setUsername()
}
invoke()