import AppLayout from 'src/layouts/AppLayout'
import { useState } from 'react'
import Head1 from 'src/character-creation/heads/head1.svg'
import Head2 from 'src/character-creation/heads/head2.svg'
import Body1 from 'src/character-creation/bodies/body1.svg'
import Body2 from 'src/character-creation/bodies/body2.svg'
import Body3 from 'src/character-creation/bodies/body3.svg'
import Body4 from 'src/character-creation/bodies/body4.svg'
import HairBack1 from 'src/character-creation/hair/hairback1.svg'
import HairBack2 from 'src/character-creation/hair/hairback2.svg'
import HairBack3 from 'src/character-creation/hair/hairback3.svg'
import HairBack4 from 'src/character-creation/hair/hairback4.svg'
import HairBack5 from 'src/character-creation/hair/hairback5.svg'
import HairBack6 from 'src/character-creation/hair/hairback6.svg'
import HairFront1 from 'src/character-creation/hair/hairfront1.svg'
import HairFront2 from 'src/character-creation/hair/hairfront2.svg'
import HairFront4 from 'src/character-creation/hair/hairfront4.svg'
import HairFront5 from 'src/character-creation/hair/hairfront5.svg'
import Hat1 from 'src/character-creation/hats/hat1.svg'
import Eyes1 from 'src/character-creation/eyes/eyes1.svg'
import Eyes2 from 'src/character-creation/eyes/eyes2.svg'
import Eyes3 from 'src/character-creation/eyes/eyes3.svg'
import Neck1 from 'src/character-creation/necks/neck1.svg'
import Mouth1 from 'src/character-creation/mouths/mouth1.svg'
import Mouth2 from 'src/character-creation/mouths/mouth2.svg'
import Mouth3 from 'src/character-creation/mouths/mouth3.svg'
import Ears1 from 'src/character-creation/ears/ears1.svg'
import Ears2 from 'src/character-creation/ears/ears2.svg'
import Facial1 from 'src/character-creation/facial/facial1.svg'
import Facial2 from 'src/character-creation/facial/facial2.svg'
import Nose1 from 'src/character-creation/noses/nose1.svg'
import Nose2 from 'src/character-creation/noses/nose2.svg'
import Nose3 from 'src/character-creation/noses/nose3.svg'
import Glasses1 from 'src/character-creation/glasses/glasses1.svg'
import EmptySlot from 'src/character-creation/none.svg'

function nextInArray(i, array) {
  const out = i + 1
  if (out > array.length - 1) {
    return 0
  }
  return out
}

const characterChoices = {
  bodies: [Body1, Body2, Body3, Body4],
  ears: [Ears1, Ears2],
  eyes: [Eyes1, Eyes2, Eyes3],
  facial: [EmptySlot, Facial1, Facial2],
  glasses: [EmptySlot, Glasses1],
  hairFront: [
    EmptySlot,
    HairFront1,
    HairFront2,
    EmptySlot,
    HairFront4,
    HairFront5,
    EmptySlot,
    EmptySlot,
  ],
  hairBack: [
    EmptySlot,
    HairBack1,
    HairBack2,
    HairBack3,
    HairBack4,
    HairBack5,
    HairBack6,
    HairBack2,
  ],
  hats: [EmptySlot, Hat1],
  heads: [Head1, Head2],
  mouths: [Mouth1, Mouth2, Mouth3],
  necks: [Neck1],
  noses: [Nose1, Nose2, Nose3],
  skinColours: ['#eac5a4', '#875e42', '#ffc197', '#6d4430'],
  skin2Colours: ['#d37762', '#5e382f', '#e28f7f', '#603126'],
  hairColours: [
    '#c7ea47',
    '#3d2a33',
    '#3a5260',
    '#5e142d',
    '#f7643c',
    '#b2a4a1',
    '#f9ea80',
  ],
}

const ProfilePage = () => {
  let user = {
    name: 'Sir Four-oh-four',

    guild: 'the not found',

    title: 'knight',

    level: 404,

    completed: 69420,

    characterDesign: {
      head: 0,
      body: 0,
      ears: 0,
      facial: 0,
      hair: 0,
      hat: 0,
      nose: 0,
      mouth: 0,
      neck: 0,
      glasses: 0,
      eyes: 0,
    },

    characterColours: {
      skin: 0,
      hair: 0,
    },
  }

  const [skinIndex, setSkinIndex] = useState(user.characterColours.skin)
  const [headIndex, setHeadIndex] = useState(user.characterDesign.head)
  const [hairColourIndex, setHairColourIndex] = useState(
    user.characterColours.hair
  )
  const [hairIndex, setHairIndex] = useState(user.characterDesign.hair)
  const [eyeIndex, setEyeIndex] = useState(user.characterDesign.eyes)
  const [bodyIndex, setBodyIndex] = useState(user.characterDesign.body)
  const [facialIndex, setFacialIndex] = useState(user.characterDesign.facial)
  const [earIndex, setEarIndex] = useState(user.characterDesign.ears)
  const [noseIndex, setNoseIndex] = useState(user.characterDesign.nose)
  const [glassesIndex, setGlassesIndex] = useState(user.characterDesign.glasses)
  const [mouthIndex, setMouthIndex] = useState(user.characterDesign.mouth)
  const [hatIndex, setHatIndex] = useState(user.characterDesign.hat)

  const hairColour = characterChoices.hairColours[hairColourIndex]
  const skinColour = characterChoices.skinColours[skinIndex]
  const skin2Colour = characterChoices.skin2Colours[skinIndex]
  const Head = characterChoices.heads[headIndex]
  const HairBack = characterChoices.hairBack[hairIndex]
  const HairFront = characterChoices.hairFront[hairIndex]
  const Neck = characterChoices.necks[0]
  const Body = characterChoices.bodies[bodyIndex]
  const Ears = characterChoices.ears[earIndex]
  const Eyes = characterChoices.eyes[eyeIndex]
  const Facial = characterChoices.facial[facialIndex]
  const Nose = characterChoices.noses[noseIndex]
  const Glasses = characterChoices.glasses[glassesIndex]
  const Mouth = characterChoices.mouths[mouthIndex]
  const Hat = characterChoices.hats[hatIndex]

  const handleSkinChange = () => {
    let newSkinIndex = nextInArray(skinIndex, characterChoices.skinColours)
    setSkinIndex(newSkinIndex)
  }

  const handleHairColourChange = () => {
    let newHairColourIndex = nextInArray(
      hairColourIndex,
      characterChoices.hairColours
    )
    setHairColourIndex(newHairColourIndex)
  }

  const handleHeadChange = () => {
    let newHeadIndex = nextInArray(headIndex, characterChoices.heads)
    setHeadIndex(newHeadIndex)
  }

  const handleHairChange = () => {
    let newHairIndex = nextInArray(hairIndex, characterChoices.hairFront)
    setHairIndex(newHairIndex)
  }

  const handleEyeChange = () => {
    let newEyeIndex = nextInArray(eyeIndex, characterChoices.eyes)
    setEyeIndex(newEyeIndex)
  }

  const handleBodyChange = () => {
    let newBodyIndex = nextInArray(bodyIndex, characterChoices.bodies)
    setBodyIndex(newBodyIndex)
  }

  const handleFacialChange = () => {
    let newFacialIndex = nextInArray(facialIndex, characterChoices.facial)
    setFacialIndex(newFacialIndex)
  }

  const handleEarChange = () => {
    let newEarIndex = nextInArray(earIndex, characterChoices.ears)
    setEarIndex(newEarIndex)
  }

  const handleNoseChange = () => {
    let newNoseIndex = nextInArray(noseIndex, characterChoices.noses)
    setNoseIndex(newNoseIndex)
  }

  const handleGlassesChange = () => {
    let newGlassesIndex = nextInArray(glassesIndex, characterChoices.glasses)
    setGlassesIndex(newGlassesIndex)
  }

  const handleMouthChange = () => {
    let newMouthIndex = nextInArray(mouthIndex, characterChoices.mouths)
    setMouthIndex(newMouthIndex)
  }

  const handleHatChange = () => {
    let newHatIndex = nextInArray(hatIndex, characterChoices.hats)
    setHatIndex(newHatIndex)
  }

  return (
    <AppLayout>
      <div className="text-center">
        <h1 className="pt-4 text-3xl">Character Sheet</h1>
        <p>{user?.name}</p>
        <p className="italic text-sm text-gray-400 mb-16">
          {user?.title} of {user?.guild}
        </p>

        {/* CHARACTER SVG STUFF */}

        <div className="flex overflow-hidden my-2 mx-auto justify-self-center w-64 h-80 bg-white place-content-center ">
          <HairBack id="hairBack" className="absolute w-56 mt-2"></HairBack>
          <Neck id="skin" className="absolute w-6 mt-36"></Neck>
          <Body id="body" className="absolute w-48 mt-40"></Body>

          <Head id="skin" className="absolute w-52 mt-4"></Head>
          <Ears id="skin" className="absolute w-48 mt-24"></Ears>

          <Eyes id="eyes" className="absolute w-44 mt-4 pt-1"></Eyes>
          <Mouth id="skin2" className="absolute w-44 pt-3 mt-6"></Mouth>
          <Facial id="hair" className="absolute w-52 mt-3"></Facial>
          <Nose id="skin2" className="absolute w-48 mt-2 pt-2"></Nose>

          <Glasses id="glasses" className="absolute w-36 mt-24"></Glasses>

          <HairFront id="hair" className="absolute w-56 mt-3"></HairFront>

          <Hat id="hat" className="absolute w-56 pt-1 -mt-20"></Hat>
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
                fill: ${hairColour};
              }

              #hat .cls-2 .cls-1 .cls-3 {
                stroke: none;
                fill: #e8dbd1;
              }

              #hairBack .cls-1 {
                stroke: none;
                fill: ${hairColour};
              }

              #skin .cls-1 {
                stroke: none;
                fill: ${skinColour};
              }

              #skin2 .cls-1 {
                stroke: none;
                fill: ${skin2Colour};
              }

              #eyes .cls-1 {
                stroke: none;
                fill: #ffffff;
              }

              #eyes .cls-2 {
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
        <button onClick={handleSkinChange}>Change skin</button>
        <br></br>
        <button onClick={handleHeadChange}>Change head</button>
        <br></br>
        <button onClick={handleHairChange}>Change hair</button>
        <br></br>
        <button onClick={handleHairColourChange}>Change hair colour</button>
        <br></br>
        <button onClick={handleEyeChange}>Change eyes</button>
        <br></br>
        <button onClick={handleBodyChange}>Change body</button>
        <br></br>
        <button onClick={handleFacialChange}>Change facial hair</button>
        <br></br>
        <button onClick={handleEarChange}>Change ears</button>
        <br></br>
        <button onClick={handleNoseChange}>Change nose</button>
        <br></br>
        <button onClick={handleGlassesChange}>Change glasses</button>
        <br></br>
        <button onClick={handleMouthChange}>Change mouth</button>
        <br></br>
        <button onClick={handleHatChange}>Change hat</button>
      </div>
    </AppLayout>
  )
}

export default ProfilePage
