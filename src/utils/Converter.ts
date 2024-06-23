import { Video, Audio } from 'yt-converter'

export async function audio(url: string) {
  const data = await Audio({
    url,
    onDownloading: (d) => console.log(d)
  })

  return data.message
}

export async function video(url: string) {
  const data = await Video({
    url,
    onDownloading: (d) => console.log(d)
  })

  return data.message
}
