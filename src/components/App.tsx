import { useState } from 'react'
import { extractVideoId, fetchVideoData } from '../utils/Converter'

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [convertedResult, setConvertedResult] = useState('')
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value)
  }
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const videoId = extractVideoId(youtubeUrl)
    if (!videoId) {
      alert('유효한 유튜브 주소를 입력해주세요.')
      return
    }
    const data = await fetchVideoData(videoId)
    setConvertedResult(data)
  }
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 pt-40">
          <div className="sm:max-w-lg">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              유튜브 MP3 다운로드
            </h1>
            <p className="mt-2 text-xl text-gray-500">
              아래 입력창에 유튜브 주소를 입력하면 MP3로 다운로드 받을 수
              있습니다.
            </p>
          </div>
          <div className="mt-12 sm:flex ">
            <div className="w-full sm:max-w-lg">
              <form
                className="flex flex-col space-y-4"
                onSubmit={handleFormSubmit}
              >
                <input
                  type="text"
                  className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
                  placeholder="유튜브 주소를 입력하세요"
                  value={youtubeUrl}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  변환하기
                </button>
              </form>

              {convertedResult && (
                <div className="mt-4 text-gray-700">
                  <a
                    href={convertedResult}
                    download
                    className="block w-full text-center px-4 py-2 text-white bg-slate-500 rounded-md hover:bg-slate-900 focus:outline-none focus:ring-2  focus:ring-opacity-50"
                  >
                    다운로드
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <a className="pr-4">
              해당 서비스로 추출된 파일의 저작권은 모두 영상 제작자에게 있으며,
              비영리적 개인소장용으로만 사용해주세요.
              <br />
              서비스를 이용함으로써 생기는 모든 법적 불이익에 개발자는 책임지지
              않습니다.
            </a>
            <br />
            <a className="text-blue-500" href="https://github.com/withjihyuk">
              made by withjihyuk
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
