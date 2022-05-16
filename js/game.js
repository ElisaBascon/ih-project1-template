class Game{
  constructor(context) {
    this.ctx = context;
    this.pana = new Player(-200, 200, 800, 800);
    this.enemies = enemies;
    // this.enemies = [];
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
      if (currentEnemy == this.enemies.length) {
      currentEnemy = 0;
      clearInterval(this.enemyInterval);
      clearInterval(this.paintingEnemy);
      this._checkPoints();
     }
     currentEnemy++;
    }, 500);
  }

  // Se encargan de comprobar como va el usuario

  _checkIfGameOver() {
    // Miro los points, si < 0 = gameOver
    // LLamo la función a la de gameOver
    if (this.points < 0) {
      this._gameOver()
    }
  }

  _checkPoints() {
    // Si cuando acabe tengo +3, siguiente nivel
    // Si tengo entre 0 y 3, vuelve a repetir
    // this._nextLevel()
    if (this.points <= 2) {
      this.start()
    } 
    if (this.points >= 3) {
      this._nextLevel()
    }
  }

  // Funciones de abajo: se encargan de parar el juego y printar las pantallas de resultado

  _gameOver() {
    // Para todos los intervals
    // Pinta pantalla de game over
    clearInterval(this.enemyInterval);
    clearInterval(this.paintingEnemy);
    const losePage = document.getElementById('lose-page');
    losePage.style = "display: flex";
    const canvas = document.getElementById('canvas');
    canvas.style = "display: none;"
  }

  _nextLevel() {
    // Creas otra en HTML que sea de buen resultado
    // Paro todos los intervals
    // Pinto la pantalla
    console.log('next level')
    clearInterval(this.enemyInterval);
    clearInterval(this.paintingEnemy);
    const nextLevel = document.getElementById('next-level');
    nextLevel.style = "display: flex";
    const canvas = document.getElementById('canvas');
    canvas.style = "display: none;"
  }

  /*_generateEnemy() {
    // Crear uno nuevo
    // Asignarle random el good o bad
    const newEnemie = new this.enemies;
      if (Math.floor(Math.random() * 3) > 1) {
      this.role = 'bad';
    } else {
      this.role = 'good';
    }
    // Asignarle random 50 o 250 en la X para que sea izquierda o derecha
    let positionRight = this.paintingEnemy.x === 175;
    let positionLeft = this.paintingEnemy.x === 15;
    this.paintingEnemy = position[Math.floor(Math.random() )];
  } */

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
    if (this.paintingEnemy.x === 175 && this.paintingEnemy.role == 'good') {
      this.points += 1;
    } else if (this.paintingEnemy.x === 175 && this.paintingEnemy.role == 'bad') {
      this.points -= 1;
    }
    this._checkIfGameOver()
  }

  checkLeft() {
    if (this.paintingEnemy.x === 15 && this.paintingEnemy.role == 'good') {
      this.points += 1;
    } else if (this.paintingEnemy.x === 15 && this.paintingEnemy.role == 'bad') {
      this.points -= 1;
    }
    this._checkIfGameOver()
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
    window.requestAnimationFrame(() => this._update());
    this._writeScore();
  }

  start() {
    this._assignControls();
    this._assignCurrentEnemy();
    // LLamo a un set interval que cada X tiempo me genere un nuevo enemigo 
    this._update();
  }
}