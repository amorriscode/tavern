import MonacoEditor from 'react-monaco-editor'
import { useState } from 'react'

import Hint from 'src/components/Hint'
import Example from 'src/components/Example'
import Console from 'src/components/Console'
import DifficultyPill from 'src/components/DifficultyPill'

export const QUERY = gql`
  query ProblemQuery($id: Int!) {
    problem(id: $id) {
      id
      name
      description
      difficulty {
        name
        color
      }
      hints
      sampleInput
      sampleOutput
      scaffolds {
        id
        body
        language
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ problem, navHeight }) => {
  const [language, setLanguage] = useState('JAVASCRIPT')
  const scaffold = problem?.scaffolds.find(
    (scaffold) => scaffold.language === language
  )
  const [code, setCode] = useState(scaffold?.body || '')

  const handleCodeChange = (newValue) => setCode(newValue)

  return (
    <>
      <div className="flex">
        <div
          className="w-2/5 p-8 space-y-10 border-r-2 overflow-y-scroll"
          style={{ height: `calc(100vh - ${navHeight}px)` }}
        >
          <div className="flex justify-between">
            <h1 className="font-extrabold text-4xl text-gray-900">
              {problem.name}
            </h1>

            <div>
              <DifficultyPill difficulty={problem?.difficulty} />
            </div>
          </div>

          <div>{problem?.description}</div>

          <div>
            {problem?.hints.map((hint, hintIndex) => (
              <Hint key={hintIndex} hint={hint} hintNumber={hintIndex + 1} />
            ))}
          </div>

          <div className="mb-8">
            <Example
              input={problem?.sampleInput}
              output={problem?.sampleOutput}
            />
          </div>
        </div>

        <div
          className="w-3/5 overflow-hidden relative"
          style={{ height: `calc(100vh - ${navHeight})` }}
        >
          <MonacoEditor
            width="100%"
            height="100%"
            theme="vs-dark"
            language="javascript"
            value={code}
            onChange={handleCodeChange}
          />

          <Console />
        </div>
      </div>

      <style>
        {`
          body {
            overflow: hidden;
          }
        `}
      </style>
    </>
  )
}
