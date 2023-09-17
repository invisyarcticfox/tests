const API_URL = 'e621.net';
const USERID = '685299';
const pfp = document.querySelector('#pfp');
const username = document.querySelector('#username');
const e6userid = document.querySelector('#userid')
const profile = document.querySelector('#profile')
const consolestyle = 'font-style: italic;';


async function fetchResponse(userId) {
  try {
    const res = await fetch(`https://${API_URL}/users/${userId}.json`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
async function setAvatar() {
  const {
    avatar_id
  } = await fetchResponse(USERID);
  const postUrl = `${API_URL}/posts/${avatar_id}`;
  const fullUrl = `https://static1.${API_URL}/data/sample/4a/48/4a48423ccfd10cffdc5ae28b2b0f7e81.jpg`;
  pfp.src = fullUrl;
  pfp.width = "256";
  console.log(`got avatar id! %c(${avatar_id})`, consolestyle)
}

async function setUsername() {
  const {
    name,
    id
  } = await fetchResponse(USERID);
  username.innerHTML = `${name}`;
  e6userid.innerHTML = `${id}`;
  console.log(`got username! %c(${name})`, consolestyle)
  console.log(`got user id! %c(${id})`, consolestyle)
}

async function setProfileUrl() {
  const {
    id
  } = await fetchResponse(USERID);
  profile.href = `https://${API_URL}/users/${USERID}`
  profile.innerHTML = "e6 profile"
}

function invoke() {
  setInterval(() => {
    // presenceInvoke();
    // statusInvoke();
  }, 1000);
  setAvatar();
  setUsername();
  setProfileUrl();
}

invoke();