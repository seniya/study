class Block {
  constructor () {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    document.body.appendChild(this.canvas)

    console.log('canvas : ', this.canvas)

    this.resize()

    this.x = this.canvas.width / 2
    this.y = this.canvas.height - 30
    this.dx = 2
    this.dy = -2
    this.ballRadius = 10

    this.paddleHeight = 10
    this.paddleWidth = 75
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2

    this.rightPressed = false
    this.leftPressed = false

    document.addEventListener('keydown', this.keyDownHandler, false)
    document.addEventListener('keyup', this.keyUpHandler, false)

    this.draw()
  }

  resize () {
    this.stageWidth = 600
    this.stageHeight = 600

    this.canvas.width = this.stageWidth
    this.canvas.height = this.stageHeight
    // this.ctx.scale(2, 2) // 레티나 디스플레이용
  }

  draw () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawBall()
    this.drawPaddle()

    if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx
    }
    if (this.y + this.dy > this.canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy
    }

    if (this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
      this.paddleX += 7
    } else if (this.leftPressed && this.paddleX > 0) {
      this.paddleX -= 7
    }

    this.x += this.dx
    this.y += this.dy

    // console.log('draw()')
    setTimeout(() => {
      this.draw()
    }, 10)
  }

  drawBall () {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2)
    this.ctx.fillStyle = '#0095DD'
    this.ctx.fill()
    this.ctx.closePath()
  }

  drawPaddle () {
    // console.log('drawPaddle this.paddleX : ', this.paddleX)
    this.ctx.beginPath()
    this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight)
    // this.ctx.rect(150, 150, 100, 50)
    this.ctx.fillStyle = '#0095DD'
    this.ctx.fill()
    this.ctx.closePath()
  }

  keyDownHandler = (e) => {
    if (e.keyCode === 39) {
      this.rightPressed = true
    } else if (e.keyCode === 37) {
      this.leftPressed = true
    }
  }

  keyUpHandler = (e) => {
    // console.log('keyUpHandler e.keyCode : ', e.keyCode)
    if (e.keyCode === 39) {
      this.rightPressed = false
    } else if (e.keyCode === 37) {
      this.leftPressed = false
    }
  }

  methodA = (e) => {

  }

  methodB = (e) => {

  }


}