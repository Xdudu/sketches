import canvasSketch from 'canvas-sketch'


const DIMENSIONS = [ 1080, 700 ]

const EYES_AT = [ 200, 270 ]
const MAX_EYE_AT_BIAS = 20

const EYES_SIZE = [ 150, 80 ]
const MAX_EYES_SIZE_BIAS = 0.7  // relatively

const COLORS = [ '#0ff', '#f00', '#0f0', '#f0f', '#00f', '#ff0', '#fff' ]
const genColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}
const genEyes = () => {
  const eyesAtBias = [
    MAX_EYE_AT_BIAS * (Math.random() - 0.5),
    MAX_EYE_AT_BIAS * (Math.random() - 0.5),
  ]
  const eyesAt = [
    EYES_AT[0] + eyesAtBias[0],
    EYES_AT[1] + eyesAtBias[1],
  ]
  const eyesSizeBias = [
    MAX_EYES_SIZE_BIAS * (Math.random() - 0.5),
    MAX_EYES_SIZE_BIAS * (Math.random() - 0.5),
  ]
  const eyesSize = [
    EYES_SIZE[0] * ( 1 + eyesSizeBias[0] ),
    EYES_SIZE[1] * ( 1 + eyesSizeBias[1] ),
  ]
  const color = genColor()
  return {
    eyesAt,
    eyesSize,
    color,
  }
}

const genTheirEyes = () => {
  const theirEyes = []
  const eyesCnt = 10
  for (let i = 0; i < eyesCnt; i++) {
    theirEyes.push(genEyes())
  }
  return theirEyes
}

const drawEyes = (context, eyesAt, eyesSize, color) => {
  context.strokeStyle = color
  context.strokeRect(
    - eyesAt[0] - eyesSize[0] / 2,
    eyesAt[1] - eyesSize[1] / 2,
    ...eyesSize
  )
  context.strokeRect(
    eyesAt[0] - eyesSize[0] / 2,
    eyesAt[1] - eyesSize[1] / 2,
    ...eyesSize
  )
}

const MOUTH_AT = 790
const MOUTH_AT_BIAS = 20
const MOUTH_LENGTH = 500
const MOUTH_LENGTH_BIAS = 250
const genMouth = () => {
  return {
    length: MOUTH_LENGTH + MOUTH_LENGTH_BIAS * (Math.random() - 0.5),
    at: MOUTH_AT + MOUTH_AT_BIAS * (Math.random() - 0.5),
    color: genColor(),
  }
}

const settings = {
  dimensions: DIMENSIONS,
  animate: true,
  duration: 10,
  fps: 20,
  playbackRate: 'throttle',
}

const sketch = () => {
  const theirEyes = genTheirEyes()
  return ({ context }) => {
    context.fillStyle = '#000'
    context.fillRect(0, 0, ...DIMENSIONS)
    context.translate(DIMENSIONS[0] / 2, 0)
    theirEyes.forEach((eyes, index) => {
      const blinkOverChange = Math.random() > 0.2
      if (blinkOverChange) {
        const { eyesAt, eyesSize, color } = eyes
        drawEyes(
          context,
          [
            eyesAt[0] + 10 * (Math.random() - 0.5),
            eyesAt[1] + 10 * (Math.random() - 0.5)
          ],
          [
            eyesSize[0] + 10 * (Math.random() - 0.5),
            eyesSize[1] + 10 * (Math.random() - 0.5)
          ],
          color
        )
      } else {
        const newEyes = genEyes()
        theirEyes[index] = newEyes
        const { eyesAt, eyesSize, color } = newEyes
        drawEyes(context, eyesAt, eyesSize, color)
      }
    })
    // const mouth = genMouth()
    // context.strokeStyle = mouth.color
    // context.strokeRect(
    //   - mouth.length / 2,
    //   mouth.at,
    //   mouth.length,
    //   2
    // )
  }
}

canvasSketch(sketch, settings)
