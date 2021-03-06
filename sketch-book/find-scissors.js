import canvasSketch from 'canvas-sketch'
import random from 'canvas-sketch-util/random'
const colorPalatte = require('nice-color-palettes')


const DIMENSIONS = [ 595, 842 ]

const settings = {
  dimensions: DIMENSIONS,
}

const unitSize = 30

const drawX = (context, strokeStyle = 'rgba(100, 100, 100, 0.3)') => {
  context.strokeStyle = strokeStyle
  context.beginPath()
  context.moveTo(0, 0)
  context.lineTo(unitSize, unitSize)
  context.stroke()
  context.moveTo(unitSize, 0)
  context.lineTo(0, unitSize)
  context.stroke()
  context.closePath()
}

const drawScissors = (context, colors) => {
  const color = random.pick(colors)
  drawX(context, color)
  context.strokeStyle = color
  context.beginPath()
  context.arc(unitSize / 2, unitSize, unitSize / 2, - Math.PI, 0)
  context.stroke()
  context.closePath()
}

const sketch = () => {
  // const seed = Math.random() * 99
  const seed = 33.44709456371453
  const randomInstance = random.createRandom(seed)

  const colorPalatteSeed = Math.round(Math.random() * 100)
  const colors = colorPalatte[colorPalatteSeed]

  return ({ context, width, height }) => {
    context.fillStyle = '#fff'
    context.fillRect(0, 0, width, height)
    context.lineWidth = 0.6
    for (let i = 0; i < Math.ceil(DIMENSIONS[0] / unitSize); i ++) {
      for (let j = 0; j < Math.ceil(DIMENSIONS[1] / unitSize); j ++) {
        context.translate(i * unitSize, j * unitSize)
        randomInstance.value() < 0.01 ? drawScissors(context, colors) : drawX(context)
        context.resetTransform()
      }
    }
  }
}

canvasSketch(sketch, settings)
