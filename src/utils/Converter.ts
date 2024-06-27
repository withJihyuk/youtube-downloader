import axios from 'axios'

const YOUTUBE_URL_REGEX =
  /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

function extractVideoId(url: string): string | null {
  const match = url.match(YOUTUBE_URL_REGEX)
  return match ? match[1] : null
}

async function fetchVideoData(videoId: string) {
  const options = {
    method: 'GET',
    url: `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,
    headers: {
      'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
      'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY
    }
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
    return response.data['link']
  } catch (error) {
    console.error(error)
  }
}

export { extractVideoId, fetchVideoData }
