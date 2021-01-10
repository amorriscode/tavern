import { routes, navigate } from '@redwoodjs/router'
import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'

import AppLayout from 'src/layouts/AppLayout'

const CREATE_GUILD = gql`
  mutation CreateGuild($input: CreateGuildInput!) {
    createGuild(input: $input) {
      id
    }
  }
`

const CreateGuildPage = () => {
  const [users, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [createGuild] = useMutation(CREATE_GUILD, {
    onCompleted: ({ createGuild: { id } }) => {
      navigate(routes.guild({ id }))
    },
  })

  const onSubmit = (data) => {
    createGuild({
      variables: {
        input: { ...data, users },
      },
    })
  }

  const handleAddUser = () => {
    setUsers([...users, email])
    setEmail('')
  }

  const handleRemoveUser = (email) => {
    setUsers(users.filter((user) => user !== email))
  }

  return (
    <AppLayout>
      <div className="container mx-auto mt-8">
        <div className="mb-4 w-1/2 mx-auto">
          <h1 className="font-extrabold text-4xl text-gray-900 mb-1">
            Create your guild!
          </h1>

          <p>
            An adventurer should never have to face dungeons, dragons, or quests
            alone. Invite your friends to tackle algorithms collectively.
          </p>
        </div>

        <Form
          onSubmit={onSubmit}
          className="space-y-4 bg-white p-8 rounded-sm border-2 border-brand-purple w-1/2 mx-auto"
        >
          <div>
            <Label name="Name" className="label" errorClassName="label error" />
            <TextField
              name="name"
              className="border rounded-sm border-brand-purple bg-brand-white p-2 w-full focus:border-brand-pink"
              errorClassName="border rounded-sm border-brand-purple bg-brand-white p-2 w-full focus:border-brand-pink"
              validation={{ required: true }}
            />
            <FieldError name="name" className="error-message" />
          </div>

          <div>
            <Label
              name="Invite characters to your guild"
              className="label"
              errorClassName="label error"
            />
            <div className="flex space-x-2">
              <input
                type="email"
                value={email}
                placeholder="mj@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-sm border-brand-purple bg-brand-white p-2 w-full focus:border-brand-pink"
              />

              <button
                onClick={handleAddUser}
                className="text-brand-purple hover:text-brand-pink px-3"
              >
                Invite
              </button>
            </div>

            {!!users.length && (
              <div className="rounded-sm px-4 bg-gray-100 bg-opacity-50 divide-y divide-gray-200 mt-2">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="flex py-4 justify-between items-center"
                  >
                    <div>{user}</div>

                    <RiCloseLine
                      onClick={() => handleRemoveUser(user)}
                      className="text-2xl hover:text-red-600 hover:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <Submit className="bg-brand-purple hover:bg-opacity-75 text-white px-3 py-2 rounded-sm">
            Create
          </Submit>
        </Form>
      </div>
    </AppLayout>
  )
}

export default CreateGuildPage
