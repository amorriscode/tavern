import { useState } from 'react'
import { RiArrowDropDownFill, RiArrowDropUpFill } from 'react-icons/ri'

const Hint = ({ hint, hintNumber }) => {
  const [displayHint, setDisplayHint] = useState(false)

  return (
    <div
      className="border-b-2 hover:border-gray-300 hover:cursor-pointer py-2"
      onClick={() => setDisplayHint(!displayHint)}
    >
      <div className="font-bold flex justify-between items-center">
        <div>Hint {hintNumber}</div>

        <div className="text-xl">
          {displayHint ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
        </div>
      </div>

      {displayHint && <div className="mt-2">{hint}</div>}
    </div>
  )
}

export default Hint
