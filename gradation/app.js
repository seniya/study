import { GlowParticle } from './glowparticle.js'

const COLORS = [
  { r: 45, g: 74, b: 227 }, // blue
  { r: 205, g: 255, b: 89 }, // yellow
  { r: 255, g: 104, b: 248 }, // pupple
  { r: 44, g: 209, b: 252 }, // skyblue
  { r: 54, g: 233, b: 84 } // green
]

class App {
  constructor () {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    document.body.appendChild(this.canvas)

    this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1

    this.totalParticles = 15
    this.particles = []
    this.maxRadius = 600
    this.minRadius = 300

    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()
    requestAnimationFrame(this.animate.bind(this))
  }

  resize () {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    this.canvas.width = this.stageWidth * this.pixelRatio
    this.canvas.height = this.stageHeight * this.pixelRatio
    this.ctx.scale(this.pixelRatio, this.pixelRatio)

    this.ctx.globalCompositeOperation = 'saturation'

    this.createParticles()
  }

  createParticles () {
    let curColor = 0
    this.particles = []

    for (let i = 0; i < this.totalParticles; i++) {
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        COLORS[curColor]
      )

      if (++curColor >= COLORS.length) {
        curColor = 0
      }

      this.particles[i] = item

      // item.animate(this.ctx)
    }
  }

  animate (t) {
    requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    for (let i = 0; i < this.totalParticles; i++) {
      const item = this.particles[i]
      item.animate(this.ctx, this.stageWidth, this.stageHeight)
    }
  }
}

window.onload = () => {
  // eslint-disable-next-line no-new
  new App()
}
