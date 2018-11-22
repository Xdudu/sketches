const canvasSketch = require('canvas-sketch');


const RADIUS = 200
const SEGMENT_COUNT = 20
const SEGMENT_LENGTH = RADIUS / SEGMENT_COUNT

const getOtherLeg = (hypotenuse, oneLeg) => Math.sqrt(hypotenuse * hypotenuse - oneLeg * oneLeg)


const settings = {
  animate: true,
  duration: 1.5,
}

const sketch = () => {
  return ({ context, width, height, playhead }) => {
    const CANVAS_CENTER = [ width / 2, height / 2 ]
    context.fillStyle = '#fffff6'
    context.fillRect(0, 0, width, height)
    for (let i = 1; i <= SEGMENT_COUNT; i++) {
      context.lineWidth = 1.3 * i / SEGMENT_COUNT
      context.strokeStyle = `rgba(3, 50, 3, ${i / SEGMENT_COUNT})`
      context.beginPath()
      let length = SEGMENT_LENGTH * (i + playhead)
      context.moveTo(CANVAS_CENTER[0] - length, CANVAS_CENTER[1] - getOtherLeg(RADIUS, length))
      context.lineTo(CANVAS_CENTER[0] + length, CANVAS_CENTER[1] - getOtherLeg(RADIUS, length))
      length = SEGMENT_LENGTH * (i - playhead)
      context.moveTo(CANVAS_CENTER[0] - length, CANVAS_CENTER[1] + getOtherLeg(RADIUS, length))
      context.lineTo(CANVAS_CENTER[0] + length, CANVAS_CENTER[1] + getOtherLeg(RADIUS, length))
      context.stroke()
    }
  }
}

canvasSketch(sketch, settings)
