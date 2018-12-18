const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const WIDTH = 1200
const HEIGHT = 500
const settings = {
  dimensions: [ WIDTH, HEIGHT ],
  loop: false,
}

const HEIGHT_SCOPE = [ 200, 300 ]

const sketch = () => {
  const seed = Math.random() * 99
  random.setSeed(seed)

  const incX = 0.0005
  const incY = 0.05
  const inc1 = 0.001
  let x = 0, x1 = 0
  let y = 0, y1 = 0

  let lastPoint

  return ({ context }) => {
    context.fillStyle = '#000'
    context.fillRect(0, 0, WIDTH, HEIGHT)
    context.lineWidth = 3
    context.fillStyle = 'none'
    for (let i = HEIGHT_SCOPE[0]; i < HEIGHT_SCOPE[1]; i += 20) {
      for (let j = 0; j < WIDTH; j++) {
        const pos = random.noise2D(x, y)
        const alpha = random.noise2D(x1, y1) / 4 + 0.75
        // const gray = Math.round((random.noise2D(x1, y1) / 2 + 0.5) * 255 * 0.8)
        const point = [ j, i + 200 * pos ]

        if (j !== 0) {
          context.beginPath()
          context.moveTo(...lastPoint)
          context.lineTo(...point)
          // context.strokeStyle = `rgba(${gray}, ${gray}, ${gray}, 1)`
          context.strokeStyle = `rgba(251, 224, 3, ${alpha})`
          context.stroke()
        }

        x += incX
        x1 += inc1
        lastPoint = point
      }
      y += incY
      y1 += inc1
      x = 0
      x1 = 0
    }
    y = 0
    y1 = 0
  }
}

canvasSketch(sketch, settings)
