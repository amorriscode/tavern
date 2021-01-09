import Nav from 'src/components/Nav'

const AppLayout = ({ children }) => {
  return (
    <>
      <Nav />

      <div className="px-4">{children}</div>
    </>
  )
}

export default AppLayout
