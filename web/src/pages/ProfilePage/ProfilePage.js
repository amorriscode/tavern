import { Link, routes } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout'

const ProfilePage = () => {
  let user = {
    name: 'Sir Four-oh-four',

    guild: 'the not found',

    title: 'knight',

    level: 404,

    completed: 69420,

    characterDesign: {
      head: 1,
      body: 1,
      ears: 1,
      facial: 1,
      hair: 1,
      hat: 1,
      nose: 1,
      mouth: 1,
      neck: 1,
      glasses: 1,
      eyes: 1,
    },

    characterColours: {
      skin: '#eac5a4',
      skin2: '#d37762',
      hair: '#c7ea47',
      hair2: '#aac148',
    },
  }

  const Head = import(
    `../../character-creation/heads/head${user.characterDesign.head}.svg`
  )
  const Body = import(
    `../../character-creation/bodies/body${user.characterDesign.body}.svg`
  )
  const HairBack = import(
    `../../character-creation/hair/hairback${user.characterDesign.hair}.svg`
  )
  const HairFront = import(
    `../../character-creation/hair/hairfront${user.characterDesign.hair}.svg`
  )
  const Eyes = import(
    `../../character-creation/eyes/eyes${user.characterDesign.eyes}.svg`
  )
  const Neck = import(
    `../../character-creation/necks/neck${user.characterDesign.neck}.svg`
  )
  const Mouth = import(
    `../../character-creation/mouths/mouth${user.characterDesign.mouth}.svg`
  )
  const Ears = import(
    `../../character-creation/ears/ears${user.characterDesign.ears}.svg`
  )
  const Facial = import(
    `../../character-creation/facial/facial${user.characterDesign.facial}.svg`
  )
  const Nose = import(
    `../../character-creation/noses/nose${user.characterDesign.nose}.svg`
  )
  const Glasses = import(
    `../../character-creation/glasses/glasses${user.characterDesign.glasses}.svg`
  )

  return (
    <AppLayout>
      <div className="text-center">
        <h1 className="pt-4 text-3xl">Character Sheet</h1>
        <p>{user?.name}</p>
        <p className="italic text-sm text-gray-400">
          {user?.title} of {user?.guild}
        </p>

        {/* CHARACTER SVG STUFF */}

        <div className="flex object-cover my-2 mx-auto justify-self-center w-64 h-80 bg-white place-content-center ">
          <HairBack id="hairBack" className="absolute w-40 mt-10"></HairBack>
          <Neck id="skin" className="absolute w-6 mt-36"></Neck>
          <Body id="body" className="absolute w-36 mt-48"></Body>

          <Head id="skin" className="absolute w-36 mt-8"></Head>
          <Ears id="skin" className="absolute w-48 mt-24"></Ears>

          <Eyes id="eyes" className="absolute w-20 mt-28"></Eyes>
          <Facial id="hair" className="absolute w-8 mt-36"></Facial>
          <Nose id="skin2" className="absolute w-3 mt-24 pt-1"></Nose>

          <Glasses id="glasses" className="absolute w-36 mt-24"></Glasses>

          <HairFront id="hair" className="absolute w-40 mt-3"></HairFront>

          <Mouth id="skin2" className="absolute w-16 pt-1 mt-36"></Mouth>
        </div>

        <div>
          <style jsx>
            {`
              #body .cls-1 {
                stroke: none;
                fill: #f7643c;
              }

              #hair .cls-1 {
                stroke: none;
                fill: ${user.characterColours.hair};
              }

              #hairBack .cls-1 {
                stroke: none;
                fill: ${user.characterColours.hair2};
              }

              #skin .cls-1 {
                stroke: none;
                fill: ${user.characterColours.skin};
              }

              #skin2 .cls-1 {
                stroke: none;
                fill: ${user.characterColours.skin2};
              }

              #eyes .cls-1 {
                stroke: none;
                fill: #423b3b;
              }

              #glasses .cls-1 {
                stroke: #423b3b;
                fill: none;
              }
            `}
          </style>
        </div>

        <p>
          Level {user?.level} {user?.title}
        </p>
        <p>Guild: {user?.guild}</p>
        <p>Challenges Completed: {user?.completed}</p>
      </div>
    </AppLayout>
  )
}

export default ProfilePage
