import {
  heads,
  bodies,
  hairBacks,
  hairFronts,
  hairColours,
  hats,
  eyes,
  necks,
  mouthes,
  ears,
  facials,
  noses,
  glasses,
  empty,
  primarySkinColours,
  secondarySkinColours,
} from 'src/character-creation'

const Character = ({
  id,
  skin,
  size,
  head,
  body,
  ear,
  eye,
  facial,
  hair,
  hairColour,
  hat,
  mouth,
  neck,
  nose,
}) => {
  const Head = heads[head]
  const Neck = necks[neck]
  const Body = bodies[body]
  const Ears = ears[ear]
  const Eyes = eyes[eye]
  const Nose = noses[nose]
  const Mouth = mouthes[mouth]
  const Facial = facials[facial]

  const primarySkinColour = primarySkinColours[skin]
  const secondarySkinColour = secondarySkinColours[skin]
  const primaryHairColour = hairColours[hairColour]

  const HairBack = hairBacks[hair]
  const HairFront = hairFronts[hair]

  return (
    <div
      id={id}
      className="flex justify-self-center place-content-center overflow-hidden relative"
      style={{ height: scale(size, 1.25), width: scale(size, 1) }}
    >
      <HairBack
        className="c-hair"
        style={{
          width: scale(size, 1),
          marginTop: scale(size, 0),
          position: 'absolute',
        }}
      />
      <Head
        className="c-head"
        style={{ width: scale(size, 1), position: 'absolute' }}
      />
      <Neck
        className="c-neck"
        style={{
          width: scale(size, 0.18),
          marginTop: scale(size, 0.48),
          position: 'absolute',
        }}
      />
      <Body
        className="c-body"
        style={{
          width: scale(size, 1.15),
          marginTop: scale(size, 0.666),
          position: 'absolute',
        }}
      />
      <Ears
        className="c-ears"
        style={{
          width: scale(size, 0.8),
          marginTop: scale(size, 0.4),
          position: 'absolute',
        }}
      />
      <Eyes
        className="c-eyes"
        style={{
          width: scale(size, 1),
          marginTop: scale(size, 0),
          position: 'absolute',
        }}
      />
      <Mouth
        className="c-mouth"
        style={{
          width: scale(size, 1),
          marginTop: scale(size, 0),
          position: 'absolute',
        }}
      />
      <Facial
        className="c-facial"
        style={{
          width: scale(size, 1),
          marginTop: scale(size, 0),
          position: 'absolute',
        }}
      />
      <Nose
        className="c-nose"
        style={{
          width: scale(size, 0.9),
          marginTop: scale(size, 0.07),
          position: 'absolute',
        }}
      />
      <HairFront
        className="c-hair"
        style={{
          width: scale(size, 1),
          marginTop: scale(size, 0.0),
          position: 'absolute',
        }}
      />
      <style>
        {`
          #${id} .c-body .cls-1 {
            stroke: none;
            fill: #f7643c !important;
          }

          #${id} .c-hair .cls-1,
          #${id} .c-facial .cls-1 {
            stroke: none;
            fill: ${primaryHairColour} !important;
          }

          #${id} #hat .cls-2 .cls-1 .cls-3 {
            stroke: none;
            fill: #e8dbd1 !important;
          }

          #${id} .c-head .cls-1,
          #${id} .c-neck .cls-1,
          #${id} .c-ears .cls-1 {
            stroke: none;
            fill: ${primarySkinColour} !important;
          }

          #${id} .c-nose .cls-1,
          #${id} .c-mouth .cls-1 {
            stroke: none;
            fill: ${secondarySkinColour} !important;
          }

          #${id} .c-nose .cls-1,
          #${id} .c-mouth .cls-1 {
            stroke: none !important
          }

          #${id} .c-eyes .cls-1 {
            stroke: none;
            fill: #ffffff !important;
          }

          #${id} .c-eyes .cls-2 {
            stroke: none;
            fill: #423b3b !important;
          }

          #${id} #glasses .cls-1 {
            stroke: #423b3b;
            fill: none !important;
          }
        `}
      </style>
    </div>
  )
}

function scale(size, ratio) {
  return size * ratio + 'px'
}

export default Character
