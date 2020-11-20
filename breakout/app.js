class App {
  
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
    document.addEventListener("mousemove", this.mouseMoveHandler, false);

    

    this.brickRowCount = 3;
    this.brickColumnCount = 6;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;

    this.bricks = []
    for (let i=0; i<this.brickColumnCount; i++) {
      this.bricks[i] = []
      for (let j=0; j<this.brickRowCount; j++) {
        this.bricks[i][j] = {x:0, y:0, status: 1}
      }
    }


    this.score = 0
    this.lives = 3
    
    
    this.draw()
  }

  resize () {
    this.stageWidth = 600
    this.stageHeight = 600

    this.canvas.width = this.stageWidth
    this.canvas.height = this.stageHeight
    // this.ctx.scale(2, 2) // 레티나 디스플레이용
  }

  resize2 () {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    this.canvas.width = this.stageWidth * 2
    this.canvas.height = this.stageHeight * 2
    this.ctx.scale(2, 2) // 레티나 디스플레이용
  }

  render () {
    this.ctx.beginPath()
    this.ctx.rect(20, 40, 50, 50)
    this.ctx.fillStyle = '#ff0000'
    this.ctx.fill()
    this.ctx.closePath()

    const radians = (Math.PI / 180) * 360
    console.log('radians : ', radians)

    this.ctx.beginPath()
    this.ctx.arc(140, 60, 20, 0, radians, false)
    this.ctx.fillStyle = '#00ff00'
    this.ctx.fill()
    this.ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)'
    this.ctx.stroke()
    this.ctx.closePath()
    // console.log('this.ctx : ', this.ctx)
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawBricks()
    this.drawBall()
    this.drawPaddle()
    this.collisionDetection()
    this.drawScore()
    this.drawLives()

    if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx
    }
    if (this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy
    } else if (this.y + this.dy > this.canvas.height - this.ballRadius) {
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
        this.dy = -this.dy
      } else {
        this.lives--;
        if(this.lives <= 0) {
          alert("GAME OVER")
          document.location.reload()
          // clearInterval(interval) // Needed for Chrome to end game
        }
        else {
          this.x = this.canvas.width / 2
          this.y = this.canvas.height - 30
          this.dx = 2
          this.dy = -2
          this.paddleX = (this.canvas.width - this.paddleWidth) / 2
        }
      }
      
    }

    if (this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
      this.paddleX += 7
    } else if (this.leftPressed && this.paddleX > 0) {
      this.paddleX -= 7
    }

    this.x += this.dx
    this.y += this.dy

    requestAnimationFrame(this.draw);
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

  drawBricks() {
    // console.log('drawBricks')
    for (let i=0; i<this.brickColumnCount; i++) {
      for (let j=0; j<this.brickRowCount; j++) {

        if (this.bricks[i][j].status === 1) {
          const brickX = (i * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft
          const brickY = (j * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop

          this.bricks[i][j].x = brickX
          this.bricks[i][j].y = brickY

          // console.log('brickX : ', brickX)
          // console.log('brickY : ', brickY)

          this.ctx.beginPath()
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight)
          this.ctx.fillStyle = '#0095dd'
          this.ctx.fill()
          this.ctx.closePath()
        }        
      }
    }
  }

  collisionDetection() {
    for (let i=0; i<this.brickColumnCount; i++) {
      for (let j=0; j<this.brickRowCount; j++) {
        const b = this.bricks[i][j]
        /*
        공의 x 좌표는 벽돌의 x 좌표보다 커야 한다.
        공의 x 좌표는 벽돌의 x 좌표 + 가로 길이보다 작아야 한다.
        공의 y 좌표는 벽돌의 y 좌표보다 커야 한다.
        공의 y 좌표는 벽돌의 y 좌표 + 높이보다 작아야 한다.
        */
        if (b.status === 1) {
          if (this.x > b.x && 
            this.x < b.x + this.brickWidth && 
            this.y > b.y && this.y < 
            b.y + this.brickHeight) {
              this.dy = -this.dy
              b.status = 0
              this.score++
              if (this.score === this.brickRowCount * this.brickColumnCount) {
                alert('YOU WIN !!')
                document.location.reload()
              }
          }  
        }
      }
    }
  }

  drawScore() {
    this.ctx.font = '16px Arial'
    this.ctx.fillStyle = '#0095dd'
    this.ctx.fillText('Score: ' + this.score, 8, 20)
  }

  drawLives() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Lives: " + this.lives, this.canvas.width - 65, 20);
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

  mouseMoveHandler = (e) => {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if(relativeX > 0 && relativeX < this.canvas.width) {
      this.paddleX = relativeX - this.paddleWidth / 2;
    }
  }
}

window.onload = () => {
  // eslint-disable-next-line no-new
  new App()
}
