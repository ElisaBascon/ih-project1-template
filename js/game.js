class Game{
  constructor(context) {
    this.ctx = context;
    this.pana = new Player(-200, 200, 800, 800);
    this.enemies = enemies;
    this.colision = new Colision(40, 100, 300, 300);
    this.paintingEnemy = undefined;
    this.points = 0;
  }

  _drawPana() {
    this.ctx.drawImage(pana, this.pana.x, this.pana.y, this.pana.width, this.pana.height);
  }

  _assignCurrentEnemy() {
    let currentEnemy = 0;
    this.enemyInterval = setInterval(() => { 
      this.paintingEnemy = enemies[currentEnemy];
      if (currentEnemy == this.enemies.length) {
      currentEnemy = 0;
      clearInterval(this.enemyInterval);
      clearInterval(this.paintingEnemy);
      this._checkPoints();
     }
     currentEnemy++;
    }, 500);
  }


  _checkIfGameOver() {
    if (this.points < 0) {
      this._gameOver()
    }
  }

  _checkPoints() {
    if (this.points <= 2) {
      this.start()
    } 
    if (this.points >= 3) {
      this._nextLevel()
    }
  }

  _gameOver() {
    clearInterval(this.enemyInterval);
    clearInterval(this.paintingEnemy);
    const losePage = document.getElementById('lose-page');
    losePage.style = "display: flex";
    const canvas = document.getElementById('canvas');
    canvas.style = "display: none;"
  }

  _nextLevel() {
    clearInterval(this.enemyInterval);
    clearInterval(this.paintingEnemy);
    const nextLevel = document.getElementById('next-level');
    nextLevel.style = "display: flex";
    const canvas = document.getElementById('canvas');
    canvas.style = "display: none;"
  }

  _deleteEnemy() {
    this.enemies.splice(0,1);
  }

  _drawEnemies() {
    if (this.paintingEnemy) {
        this.ctx.drawImage(this.paintingEnemy.image, this.paintingEnemy.x, this.paintingEnemy.y, this.paintingEnemy.width, this.paintingEnemy.height);
    }
  } 

  _drawColision() {
    if (this.checkRight === true) {
      this.ctx.drawImage(colision, this.colision.x, this.colision.y, this.colision.width, this.colision.height);
    } else if (this.checkLeft === true) {
      this.ctx.drawImage(colision, this.colision.x, this.colision.y, this.colision.width, this.colision.height);
    }
  } 

  checkRight() {
    if (this.paintingEnemy.x === 175 && this.paintingEnemy.role == 'good') {
      this.points += 1;
    } else if (this.paintingEnemy.x === 175 && this.paintingEnemy.role == 'bad') {
      this.points -= 1;
    }
    this._checkIfGameOver()
  }

  checkLeft() {
    if (this.paintingEnemy.x === 10 && this.paintingEnemy.role == 'good') {
      this.points += 1;
    } else if (this.paintingEnemy.x === 10 && this.paintingEnemy.role == 'bad') {
      this.points -= 1;
    }
    this._checkIfGameOver()
  }


  _assignControls() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.checkLeft();
          break;
        case 'ArrowRight':
          this.checkRight();
          break;
        default:
          break;
      }
    });  
  }

  _writeScore() {
    this.ctx.fillStyle = 'orange';
    this.ctx.font = "40px Arial, Helvetica, sans-serif";
    this.ctx.fillText(`SCORE: ${this.points}`, 20, 70);
  }

  _clean() {
    this.ctx.clearRect(0, 0, 400, 700);
  }

  _update() {
    this._clean();
    this._drawPana();
    this._drawEnemies();
    this._drawColision();
    this._writeScore();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._assignCurrentEnemy();
    this._update();
  }
}