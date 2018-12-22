const canvasSketch = require('canvas-sketch')
const colorPalatte = require('nice-color-palettes')

const WIDTH = 1500
const HEIGHT = 1500
const settings = {
  dimensions: [ WIDTH, HEIGHT ],
  animate: true,
}

const sketch = () => {
  const R = 2080
  const r = 20
  const drawDistance = 100 * r
  let lastAnchor = [ 0, -R ]
  let lastDraw = [ 0, -(R - drawDistance) ]
  const colors = colorPalatte[Math.round(Math.random() * 100)]

  return ({ context, width, height, time }) => {
    context.fillStyle = 'none'
    context.translate(width / 2, height / 2)

    const theta_R = 2 * time
    const connecting = [ R * Math.sin(theta_R), - R * Math.cos(theta_R) ]
    const pastLength = R * theta_R
    const theta_r = pastLength / r % (2 * Math.PI)
    const anchorFromConnecting = 2 * r * Math.sin(theta_r / 2)
    const anchorFromCenter = Math.sqrt(
      Math.pow(anchorFromConnecting, 2)
      + Math.pow(R, 2)
      - 2 * Math.abs(anchorFromConnecting) * R * Math.cos(Math.abs((Math.PI - theta_r) / 2))
    )
    const anchorDeltaTheta = takeSign(Math.sin(theta_r)) * Math.acos(
      (
        Math.pow(anchorFromCenter, 2)
        + Math.pow(R, 2)
        - Math.pow(anchorFromConnecting, 2)
      )
      / (2 * anchorFromCenter * R)
    )
    const anchorTheta = theta_R % (2 * Math.PI) - anchorDeltaTheta
    const anchor = [
      anchorFromCenter * Math.sin(anchorTheta),
      - anchorFromCenter * Math.cos(anchorTheta),
    ]

    const center_r = [ (R - r) * Math.sin(theta_R), - (R - r) * Math.cos(theta_R) ]
    const draw = getDraw(anchor, center_r, r, drawDistance)

    const colorIndex = Math.floor(theta_R / (2 * Math.PI)) % colors.length
    const color = colors[colorIndex]
    context.beginPath()
    context.strokeStyle = color
    context.moveTo(...lastDraw)
    context.lineTo(...draw)
    context.stroke()
    lastDraw = draw
    lastAnchor = anchor
  }
}

const getDraw = (anchor, center_r, r, drawDistance) => {
  return [
    anchor[0] + drawDistance / r * (center_r[0] - anchor[0]),
    anchor[1] + drawDistance / r * (center_r[1] - anchor[1]),
  ]
}

const takeSign = number => number === 0 ? 0 : (number > 0 ? 1 : -1)

canvasSketch(sketch, settings)
