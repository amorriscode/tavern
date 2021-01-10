const Example = ({ input, output }) => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Example</h2>

      <div className="mb-4">
        <h3 className="font-bold mb-1">Input</h3>
        <p className="rounded bg-gray-200 p-4 w-full">{input}</p>
      </div>

      <div>
        <h3 className="font-bold mb-1">Output</h3>
        <p className="rounded bg-gray-200 p-4 w-full">{output}</p>
      </div>
    </div>
  )
}

export default Example
