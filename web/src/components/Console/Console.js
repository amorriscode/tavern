import { useState } from 'react'
import { RiTerminalLine } from 'react-icons/ri'

const Console = () => {
  const [displayConsole, setDisplayConsole] = useState(false)

  return (
    <div className="w-3/5 fixed bottom-0 right-0 bg-brand-white">
      {displayConsole && <div className="h-64 px-8 py-4"></div>}

      <div className="flex justify-between items-center border-t-2 px-8 py-4">
        <div
          className="p-2 hover:bg-gray-200 rounded"
          onClick={() => setDisplayConsole(!displayConsole)}
        >
          <RiTerminalLine className="text-2xl text-gray-400 hover:text-gray-800 hover:cursor-pointer" />
        </div>

        <div className="space-x-2">
          <button className="px-3 py-1 bg-gray-300 hover:bg-opacity-75 rounded">
            Run
          </button>

          <button className="bg-gray-800 hover:bg-opacity-75 text-white px-3 py-1 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Console
