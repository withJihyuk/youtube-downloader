import { Video, Audio } from 'yt-converter'
import { useState } from 'react'

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('')
  const [convertedResult, setConvertedResult] = useState<string | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value)
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    async function audio(url: string) {
      const data = await Audio({
        url,
        onDownloading: (d) => console.log(d)
      })

      return data.message
    }

    try {
      const result = await audio(youtubeUrl)
      setConvertedResult(result)
    } catch (error) {
      console.error('Error converting video:', error)
    }
  }

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 pt-40">
          <div className="sm:max-w-lg">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              유튜브 MP3 / MP4 다운로드
            </h1>
            <p className="mt-2 text-xl text-gray-500">
              아래 입력창에 유튜브 주소를 입력하면 MP3 또는 MP4로 다운로드 받을
              수 있습니다.
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
            </div>
          </div>
          {convertedResult && (
            <div className="mt-4 text-gray-700">
              변환된 결과: {convertedResult}
            </div>
          )}
          <div className="mt-6 text-sm text-gray-500">
            <a className="pr-4">문의하기</a>
            <a className="pr-4">저작권 관련 고지</a>
            <a className="pr-4">이용약관</a>
            <a className="pr-4">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
