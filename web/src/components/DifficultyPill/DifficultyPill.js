const DifficultyPill = ({ difficulty }) => {
  return (
    <div
      className={`uppercase text-white rounded-sm px-4 py-2 text-xs font-bold`}
      style={{ backgroundColor: difficulty.color }}
    >
      {difficulty.name}
    </div>
  )
}

export default DifficultyPill
