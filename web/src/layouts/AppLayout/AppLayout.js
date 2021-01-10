import Nav from 'src/components/Nav'

const AppLayout = ({ children }) => {
  return (
    <>
      <Nav />

      <div>{children}</div>
    </>
  )
}

export default AppLayout
