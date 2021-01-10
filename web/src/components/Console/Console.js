import { useState, useEffect } from 'react'
import { RiTerminalLine } from 'react-icons/ri'
import { useMutation } from '@redwoodjs/web'

const RUN_PROBLEM = gql`
  mutation RunProblemMutation($id: Int!, $body: String!, $language: Language!) {
    runProblem(id: $id, body: $body, language: $language) {
      success
      logs
      error
      stacktrace
      output
      testCase {
        id
        input
        output
      }
    }
  }
`

const SUBMIT_PROBLEM = gql`
  mutation SubmitProblemMutation(
    $id: Int!
    $body: String!
    $language: Language!
  ) {
    submitProblem(id: $id, body: $body, language: $language) {
      solution {
        success
        stacktrace
        errorLogs
        output
        testCase {
          id
          input
          output
        }
        executionTime
      }
      testCaseNumber
      totalTestCaseNumber
    }
  }
`

const ExecutionResult = ({ result }) => {
  let testCase

  try {
    testCase = Object.values(JSON.parse(result?.testCase?.input || {}))
      .map((input) => (Array.isArray(input) ? `[${input}]` : input))
      .join(',')
  } catch (e) {
    console.error('Failed to parse test result')
  }

  return (
    <>
      {result?.stacktrace ? (
        <div className="w-full h-full p-4 font-mono bg-red-200 text-red-700 rounded text-sm">
          {result.stacktrace}
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-y-4">
          <div className="col-span-1 font-bold flex items-center">
            Test case
          </div>
          <div className="col-span-5 rounded-sm bg-gray-200 p-4">
            {testCase}
          </div>

          <div className="col-span-1 font-bold flex items-center">
            Your result
          </div>
          <div className="col-span-5 rounded-sm bg-gray-200 p-4">
            {result?.logs?.map((log) => (
              <div key={log}>{log}</div>
            ))}

            <div>{result?.output}</div>
          </div>

          <div className="col-span-1 font-bold flex items-center mb-4">
            Expected
          </div>
          <div className="col-span-5 rounded-sm bg-gray-200 p-4">
            {result?.testCase?.output}
          </div>
        </div>
      )}
    </>
  )
}

const Console = ({ problem, code, language }) => {
  const [displayConsole, setDisplayConsole] = useState(false)
  const [result, setResult] = useState(null)
  const [runProblem] = useMutation(RUN_PROBLEM, {
    onCompleted: ({ runProblem }) => setResult(runProblem),
  })
  const [submitProblem] = useMutation(SUBMIT_PROBLEM, {
    onCompleted: ({ submitProblem }) => setResult(submitProblem?.solution),
  })

  useEffect(() => {
    setDisplayConsole(true)
  }, [result])

  return (
    <div className="w-3/5 fixed bottom-0 right-0 bg-brand-white">
      {displayConsole && (
        <div className="h-64 px-8 py-4 overflow-y-scroll">
          {result ? (
            <div>
              <div className="text-2xl font-bold mb-2">
                {result?.success === true && (
                  <div className="text-green-700">Success</div>
                )}
                {result?.success === false && (
                  <div className="text-red-700">
                    {result?.stacktrace ? 'Runtime Error' : 'Wrong Answer'}
                  </div>
                )}
              </div>

              {result?.executionTime && result.success ? (
                <div>Your code executed in {result.executionTime} ms. 🎉</div>
              ) : (
                <ExecutionResult result={result} />
              )}
            </div>
          ) : (
            <div>Run your code to see results.</div>
          )}
        </div>
      )}

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
