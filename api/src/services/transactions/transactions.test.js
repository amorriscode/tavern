import {
  transactions,
  transaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from './transactions'

describe('transactions', () => {
  scenario('returns all transactions', async (scenario) => {
    const result = await transactions()

    expect(result.length).toEqual(Object.keys(scenario.transaction).length)
  })

  scenario('returns a single transaction', async (scenario) => {
    const result = await transaction({ id: scenario.transaction.one.id })

    expect(result).toEqual(scenario.transaction.one)
  })

  scenario('creates a transaction', async (scenario) => {
    const result = await createTransaction({
      input: {
        name: 'String',
        body: 'String',
        postId: scenario.transaction.one.post.id,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.body).toEqual('String')
  })

  scenario('updates a transaction', async (scenario) => {
    const original = await transaction({ id: scenario.transaction.one.id })
    const result = await updateTransaction({
      id: original.id,
      input: { name: 'String7626096' },
    })

    expect(result.name).toEqual('String7626096')
  })

  scenario('deletes a transaction', async (scenario) => {
    const original = await deleteTransaction({
      id: scenario.transaction.one.id,
    })

    const result = await transaction({ id: original.id })

    expect(result).toEqual(null)
  })
})
