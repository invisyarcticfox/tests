const APIKEY = 'ZpctctcBxI2mMZhXfHxWgMxrhDCDdBRigmd77tNs'
// eh whatever its just for nasa
const APIURL = `https://api.nasa.gov/planetary/apod?api_key=`
const apodimg = document.getElementById('apodimg')
const datetxt = document.getElementById('date')
const copytxt = document.getElementById('copy')

async function fetchAPOD() {
  try {
    const res = await fetch(`${APIURL}${APIKEY}`)
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}

async function setAPOD() {
  const {
    url,
    date,
    copyright
    // there are other json trees(?) available but i just wanted these to test
  } = await fetchAPOD()
  console.log(setAPOD)
  apodimg.src = `${url}`
  datetxt.innerHTML = `${date}`
  copytxt.innerHTML = `${copyright}`
}

function invoke() {
  setInterval(() => {
  }, 1000)
  setAPOD()
}
invoke()