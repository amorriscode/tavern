const Example = ({ example, exampleNumber }) => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Example {exampleNumber}</h2>

      <div className="mb-4">
        <h3 className="font-bold mb-1">Input</h3>
        <p className="rounded bg-gray-200 p-4 w-full">
          {'methods = ["constructor", "put", "get", "remove", "get"]'}
          {'arguments = [[], [1, 10], [1], [1], [1]]'}
        </p>
      </div>

      <div>
        <h3 className="font-bold mb-1">Output</h3>
        <p className="rounded bg-gray-200 p-4 w-full">
          {'[null, null, 10, null, -1]'}
        </p>
      </div>
    </div>
  )
}

export default Example
