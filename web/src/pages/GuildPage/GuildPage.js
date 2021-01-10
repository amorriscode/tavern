import AppLayout from 'src/layouts/AppLayout'
import GuildCell from 'src/components/GuildCell'

const GuildPage = ({ id }) => {
  return (
    <AppLayout>
      <GuildCell id={id} />
    </AppLayout>
  )
}

export default GuildPage
