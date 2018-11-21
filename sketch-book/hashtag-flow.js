const canvasSketch = require('canvas-sketch')

const CAPACITY = 21
const GAP = 20

const ROLES = {
  main: '#',
  secondary: '+',
}

const settings = {
  animate: true,
  duration: 2.1,
};

const sketch = () => {
  return ({ context, width, height, playhead }) => {
    const MARGIN = [
      (height - (CAPACITY - 1) * GAP) / 2,
      (width - (CAPACITY - 1) * GAP) / 2,
    ]
    context.fillStyle = '#333'
    context.fillRect(0, 0, width, height)

    context.translate(MARGIN[1], MARGIN[0])
    context.fillStyle = '#fffffa'
    context.font = '10px Courier New'
    for (let i = 0; i < CAPACITY; i++) {
      for (let j = 0; j < CAPACITY; j++) {
        const rolePosition = [ i * GAP, j * GAP ]
        const animateHead = Math.sin(playhead * Math.PI / 2)
        const flowCenter = Math.floor(animateHead * CAPACITY)
        const useMainRole = i === flowCenter || j === flowCenter
        useMainRole ?
          context.fillText(ROLES.main, ...rolePosition)
          : context.fillText(ROLES.secondary, ...rolePosition)
      }
    }
  };
};

canvasSketch(sketch, settings)
