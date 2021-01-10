import { useEffect, useState } from 'react'
import MonacoEditor from 'react-monaco-editor'

import { DIFFICULTY_COLORS } from 'src/constants'
import { getNavHeight } from 'src/lib/nav'

import AppLayout from 'src/layouts/AppLayout'
import Hint from 'src/components/Hint'
import Example from 'src/components/Example'
import Console from 'src/components/Console'

const ProblemPage = () => {
  const [code, setCode] = useState('')
  const [navHeight, setNavHeight] = useState('')

  useEffect(() => {
    setNavHeight(getNavHeight())
  }, [])

  const handleCodeChange = (newValue) => setCode(newValue)

  return (
    <AppLayout>
      <div className="flex">
        <div
          className="w-2/5 p-8 space-y-10 border-r-2 overflow-y-scroll"
          style={{ height: `calc(100vh - ${navHeight}px)` }}
        >
          <div className="flex justify-between">
            <h1 className="font-extrabold text-4xl text-gray-900">
              Algo Problem
            </h1>

            <div>
              <div
                className={`uppercase bg-${DIFFICULTY_COLORS['EASY']}-600 text-white rounded px-4 py-2 text-xs font-bold`}
              >
                easy
              </div>
            </div>
          </div>

          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            feugiat dui ac malesuada dapibus. Vestibulum vitae dignissim nisi.
            Nulla sed magna imperdiet, ultrices sem ut, eleifend tellus. Fusce
            bibendum orci pulvinar volutpat pharetra. Praesent accumsan, arcu id
            efficitur venenatis, velit dui vehicula eros, sed interdum erat nibh
            eu odio. Sed nec rhoncus nunc, vitae dapibus urna. In vestibulum,
            leo et dapibus interdum, enim tortor tempor orci, sed tempor ex eros
            sed velit. Praesent ac magna nec erat aliquam malesuada. Nullam
            lorem enim, dictum ac dui id, malesuada semper mauris. Aenean
            ornare, diam eget aliquet volutpat, eros est finibus diam, sit amet
            ultrices felis massa ut magna.
          </div>

          <div>
            {[1, 2, 3].map((hint, hintIndex) => (
              <Hint key={hintIndex} hint={hint} hintNumber={hintIndex + 1} />
            ))}
          </div>

          <div>
            <h2 className="font-extrabold text-2xl">Examples</h2>

            <div className="space-y-8 last:mb-8">
              {[1, 2, 3].map((example, exampleIndex) => (
                <Example
                  key={exampleIndex}
                  example={example}
                  exampleNumber={exampleIndex + 1}
                />
              ))}
            </div>
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
    </AppLayout>
  )
}

export default ProblemPage
