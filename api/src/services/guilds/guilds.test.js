import { guilds, guild, createGuild, updateGuild, deleteGuild } from './guilds'

describe('guilds', () => {
  scenario('returns all guilds', async (scenario) => {
    const result = await guilds()

    expect(result.length).toEqual(Object.keys(scenario.guild).length)
  })

  scenario('returns a single guild', async (scenario) => {
    const result = await guild({ id: scenario.guild.one.id })

    expect(result).toEqual(scenario.guild.one)
  })

  scenario('creates a guild', async (scenario) => {
    const result = await createGuild({
      input: {
        name: 'String',
        body: 'String',
        postId: scenario.guild.one.post.id,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.body).toEqual('String')
  })

  scenario('updates a guild', async (scenario) => {
    const original = await guild({ id: scenario.guild.one.id })
    const result = await updateGuild({
      id: original.id,
      input: { name: 'String3984741' },
    })

    expect(result.name).toEqual('String3984741')
  })

  scenario('deletes a guild', async (scenario) => {
    const original = await deleteGuild({ id: scenario.guild.one.id })
    const result = await guild({ id: original.id })

    expect(result).toEqual(null)
  })
})
