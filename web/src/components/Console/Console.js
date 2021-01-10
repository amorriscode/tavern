import { useState } from 'react'
import { RiTerminalLine } from 'react-icons/ri'
import { useMutation } from '@redwoodjs/web'

const RUN_PROBLEM = gql`
  mutation Problems_RunProblem(
    $id: Int!
    $body: String!
    $language: Language!
  ) {
    runProblem(id: $id, body: $body, language: $language) {
      success
      logs
      error
      stacktrace
    }
  }
`

const SUBMIT_PROBLEM = gql`
  mutation Problems_SubmitProblem(
    $id: Int!
    $body: String!
    $language: Language!
  ) {
    submitProblem(id: $id, body: $body, language: $language) {
      solution {
        success
        stacktrace
        errorLogs
      }
      testCaseNumber
      totalTestCaseNumber
    }
  }
`

const Console = ({ problem, code, language }) => {
  const [displayConsole, setDisplayConsole] = useState(false)
  const [runProblem] = useMutation(RUN_PROBLEM)
  const [submitProblem] = useMutation(SUBMIT_PROBLEM)

  return (
    <div className="w-3/5 fixed bottom-0 right-0 bg-brand-white">
      {displayConsole && <div className="h-64 px-8 py-4"></div>}

      <div className="flex justify-between items-center border-t-2 px-8 py-4">
        <div
          className="p-2 hover:bg-gray-200 rounded-sm"
          onClick={() => setDisplayConsole(!displayConsole)}
        >
          <RiTerminalLine className="text-2xl text-gray-400 hover:text-gray-800 hover:cursor-pointer" />
        </div>

        <div className="space-x-2">
          <button
            className="px-3 py-1 bg-gray-300 hover:bg-opacity-75 rounded-sm"
            onClick={() =>
              runProblem({
                variables: { id: problem, body: code, language },
              })
            }
          >
            Run
          </button>

          <button
            className="bg-brand-purple hover:bg-opacity-75 text-white px-3 py-1 rounded-sm"
            onClick={() =>
              submitProblem({
                variables: { id: problem, body: code, language },
              })
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Console
