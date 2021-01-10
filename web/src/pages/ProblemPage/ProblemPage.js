import { useState, useEffect } from 'react'

import { getNavHeight } from 'src/lib/nav'

import AppLayout from 'src/layouts/AppLayout'
import ProblemCell from 'src/components/ProblemCell'

const ProblemPage = ({ id }) => {
  const [navHeight, setNavHeight] = useState('')

  useEffect(() => {
    setNavHeight(getNavHeight())
  }, [])

  return (
    <AppLayout>
      <ProblemCell id={id} navHeight={navHeight} />
    </AppLayout>
  )
}

export default ProblemPage
