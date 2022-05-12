class Game{
  constructor(context) {
    this.ctx = context;
    this.pana = new Player(150, 590, 110, 110);
    this.enemies = enemies;
    this.enemyInterval = undefined;
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
      currentEnemy++;
    }, 1000);
  }

  _drawEnemies() {
    if (this.paintingEnemy) {
      if (this.paintingEnemy.role == 'bad') {
            this.ctx.drawImage(badEnemie, this.paintingEnemy.x, this.paintingEnemy.y, this.paintingEnemy.width, this.paintingEnemy.height);
          } else if (enemies[0].role == 'good') {
            this.ctx.drawImage(goodEnemie, this.paintingEnemy.x, this.paintingEnemy.y, this.paintingEnemy.width, this.paintingEnemy.height);
          }
    }
  } 

  checkRight() {
    // Si lo que hay this.paintingEnemy: posición? Derecha?
    // Si this.paintingEnemy.role == 'good'? => puntos // 'bad' => resto puntos
    if (this.paintingEnemy.x === 250 && this.paintingEnemy.role == 'good') {
      this.points += 1;
    } else if (this.paintingEnemy.x === 250 && this.paintingEnemy.role == 'bad') {
      this.points -= 1;
  }
  }
  checkLeft() {
    // Si lo que hay this.paintingEnemy.x < 200: posición? Izquierda?
    // Si this.paintingEnemy.role == 'good'? => puntos // 'bad' => resto puntos
    if (this.paintingEnemy.x === 50 && this.paintingEnemy.role == 'good') {
      this.points += 1;
    } else if (this.paintingEnemy.x === 50 && this.paintingEnemy.role == 'bad') {
      this.points -= 1;
  }
  }


  _assignControls() {
    // Controles del teclado
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
    // Función que pinta la puntuación en el canvas
    this.ctx.fillStyle = 'orange';
    this.ctx.font = "20px Verdana";
    this.ctx.fillText(`SCORE: ${this.points}`, 20, 50);
  }

  _clean() {
    this.ctx.clearRect(0, 0, 400, 700);
  }

  _update() {
    this._clean();
    this._drawPana();
    this._drawEnemies();
    window.requestAnimationFrame(() => this._update());
    this._writeScore();
  }

  start() {
    this._assignControls();
    this._assignCurrentEnemy();
    this._update();
  }
}