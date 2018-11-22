import canvasSketch from 'canvas-sketch'


// philosophy:
// 50% still live in 'one room'(too optimistic?)
// 20% homosexual

const COUPLE = {
  sizeForOne: 8,
  colors: [
    'rgba(0, 155, 182, 0.6)',
    'rgba(217, 0, 111, 0.6)',
  ],
}

const ROOM_DISTANCE = 4 * COUPLE.sizeForOne
const COUPLES_IN_ROW = 15
const CANVAS_PADDING = 2.5 * ROOM_DISTANCE
const CANVAS_SIZE = (COUPLES_IN_ROW - 1) * ROOM_DISTANCE + 2 * CANVAS_PADDING

const CANVAS_FILL = '#d9d8d8'

const settings = {
  dimensions: [ CANVAS_SIZE, CANVAS_SIZE ],
}

const positionTransformFunc = x => 2 * Math.pow(x, 3)

const genPositionDeviationSign = () => {
  const indices = [ 0, 1, 2, 3 ]
  const firstIndices = []
  while (firstIndices.length < 2) {
    firstIndices.push(...indices.splice(Math.round(Math.random() * (indices.length - 1)), 1))
  }
  return [
    firstIndices,
    indices,
  ].map(ii => ii.map(i => i % 2 ? 1 : -1))
}

const genCouples = () => {
  const couples = []
  for (let i = 0; i < COUPLES_IN_ROW; i++) {
    couples[i] = []
    for (let j = 0; j < COUPLES_IN_ROW; j++) {
      const positions = []
      while (positions.length < 4) { positions.push(positionTransformFunc(Math.random())) }
      const positionDeviationSign = genPositionDeviationSign()
      const gender = Math.random() >= 0.2
        ? [ 0, 1 ]
        : (Math.random() >= 0.5 ? [ 0, 0 ] : [ 1, 1 ] )
      couples[i][j] = {
        positions,
        positionDeviationSign,
        gender,
      }
    }
  }
  return couples
}

const sketch = () => {
  const couples = genCouples()
  return ({ context, width, height }) => {
    context.fillStyle = CANVAS_FILL
    context.fillRect(0, 0, width, height)
    context.translate(CANVAS_PADDING, CANVAS_PADDING)
    for (let i = 0; i < COUPLES_IN_ROW; i++) {
      for (let j = 0; j < COUPLES_IN_ROW; j++) {
        const { positions, positionDeviationSign, gender } = couples[i][j]
        context.fillStyle = COUPLE.colors[gender[0]]
        context.fillRect(
          i * ROOM_DISTANCE + positionDeviationSign[0][0] * positions[0] * COUPLE.sizeForOne / 2 - COUPLE.sizeForOne / 2,
          j * ROOM_DISTANCE + positionDeviationSign[0][1] * positions[1] * COUPLE.sizeForOne / 2 - COUPLE.sizeForOne / 2,
          COUPLE.sizeForOne, COUPLE.sizeForOne
        )
        context.fillStyle = COUPLE.colors[gender[1]]
        context.fillRect(
          i * ROOM_DISTANCE + positionDeviationSign[1][0] * positions[2] * COUPLE.sizeForOne / 2 - COUPLE.sizeForOne / 2,
          j * ROOM_DISTANCE + positionDeviationSign[1][1] * positions[3] * COUPLE.sizeForOne / 2 - COUPLE.sizeForOne / 2,
          COUPLE.sizeForOne, COUPLE.sizeForOne
        )
      }
    }
  }
}

canvasSketch(sketch, settings)
