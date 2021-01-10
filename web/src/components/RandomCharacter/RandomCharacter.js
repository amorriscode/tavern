import Character from '../../components/Character'
import { useState } from 'react'
import * as outfits from 'src/character-creation'
import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

const SET_OUTFIT = gql`
  mutation Outfits_SetOutfit($outfit: CreateOutfitInput!) {
    setOutfit(outfit: $outfit)
  }
`

const RandomCharacter = () => {
  const { reauthenticate } = useAuth()
  const [setOutfit] = useMutation(SET_OUTFIT, {
    onCompleted: () =>
      reauthenticate().then((_) => {
        navigate(routes.guild())
      }),
  })

  let id = Math.random().toString(36).substring(7).replace(/[0-9]/g, '')

  const [hair, setHair] = useState(
    Math.floor(Math.random() * outfits.hairBacks.length)
  )

  const [skin, setSkin] = useState(
    Math.floor(Math.random() * outfits.primarySkinColours.length)
  )

  const [head, setHead] = useState(
    Math.floor(Math.random() * outfits.heads.length)
  )

  const [neck, setNeck] = useState(
    Math.floor(Math.random() * outfits.necks.length)
  )

  const [body, setBody] = useState(
    Math.floor(Math.random() * outfits.bodies.length)
  )

  const [ear, setEar] = useState(
    Math.floor(Math.random() * outfits.ears.length)
  )

  const [eye, setEye] = useState(
    Math.floor(Math.random() * outfits.eyes.length)
  )

  const [nose, setNose] = useState(
    Math.floor(Math.random() * outfits.noses.length)
  )

  const [mouth, setMouth] = useState(
    Math.floor(Math.random() * outfits.mouthes.length)
  )

  const [facial, setFacial] = useState(
    Math.floor(Math.random() * outfits.facials.length)
  )

  const [hairColour, setHairColour] = useState(
    Math.floor(Math.random() * outfits.hairColours.length)
  )

  return (
    <>
      <div
        onClick={() => {
          setOutfit({
            variables: {
              outfit: {
                skin,
                head,
                neck,
                body,
                ears: ear,
                eyes: eye,
                nose,
                mouth,
                hair,
                facial,
                hairColour,
              },
            },
          })
        }}
        className="flex p-8 cursor-pointer hover:bg-gray-200 mx-4 transition-all duration-200"
      >
        <Character
          id={id}
          skin={skin}
          size={200}
          head={head}
          neck={neck}
          body={body}
          ear={ear}
          eye={eye}
          nose={nose}
          mouth={mouth}
          hair={hair}
          facial={facial}
          hairColour={hairColour}
        />
      </div>
    </>
  )
}

export default RandomCharacter
