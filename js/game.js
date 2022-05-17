class Game{
  constructor(context) {
    this.ctx = context;
    this.pana = new Player(-200, 200, 800, 800);
    this.enemies = enemies;
    // this.enemies = [];
    // this.enemyInterval = undefined;
    // this.disappearInterval = undefined;
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

  _generateEnemy() {
    let role;
    let side;
    let image;

    const sideAssigned = Math.random();
    if (sideAssigned > 0.50) {
      side = -15;
    } else {
      side = 165;
    }

    const roleAssigned = Math.random();
    if (roleAssigned > 0.60) {
      role = 'bad';
    } else {
      role = 'good';
    }

    if (role === 'good') {
      image = goodEnemyImages[Math.floor(Math.random() * goodEnemyImages.length)];
    } else {
      image = badEnemyImages[Math.floor(Math.random() * badEnemyImages.length)];
    }

    const newEnemie = new Enemy(side, 100, 220, 220, role, image);
    this.enemies.push(newEnemie);
    console.log(newEnemie)
  } 

  _deleteEnemy() {
    this.enemies.splice(0,1);
  }

  _drawEnemies() {
    if (this.paintingEnemy) {
        this.ctx.drawImage(this.paintingEnemy.image, this.paintingEnemy.x, this.paintingEnemy.y, this.paintingEnemy.width, this.paintingEnemy.height);
    }
    // this.enemies.forEach(elem => {
    //   this.ctx.drawImage(elem.image, elem.x, elem.y, elem.width, elem.height);
    // })
    // if (this.enemies.length > 0) {
    //   this.enemies.forEach(enemy => {
    //     if (enemy.role === 'bad') {
    //       this.ctx.drawImage(enemy.image,187,155,500,450, enemy.x, enemy.y, enemy.width, enemy.height);
    //     } else {
    //       this.ctx.drawImage(enemy.image,104,61,800,800, enemy.x, enemy.y, enemy.width, enemy.height);
    //     }
    //   });
    // }
    //   if (this.paintingEnemy.role == 'bad') {
    //         this.ctx.drawImage(badEnemie, this.paintingEnemy.x, this.paintingEnemy.y, this.paintingEnemy.width, this.paintingEnemy.height);
    //       } else if (enemies[0].role == 'good') {
    //         this.ctx.drawImage(goodEnemie, this.paintingEnemy.x, this.paintingEnemy.y, this.paintingEnemy.width, this.paintingEnemy.height);
    //       }
    // }
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
    this._writeScore();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._assignCurrentEnemy();
    // this.enemyInterval = setInterval(() => {
    //   this._generateEnemy();
    // }, 500);
    // this.disappearInterval = setInterval(() => {
    //   this._deleteEnemy();
    //  }, 600);
    this._update();
  }
}