class Game{
  constructor(context) {
    this.ctx = context;
    this.pana = new Player(150, 590, 110, 110);
    this.enemies = enemies;
    this.enemyInterval = undefined;
  }

  _drawPana() {
    this.ctx.drawImage(pana, this.pana.x, this.pana.y, this.pana.width, this.pana.height);
  }

  _drawEnemies() {
    let counter = 0; 
    this.enemyInterval = setInterval(() => {
       for (let i = 0; i < enemies.length; i++) {	
      counter = counter + i;
    }
  }, 2000);
  console.log(counter);
} 

  _assignControls() {
    // Controles del teclado
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.meatball.moveLeft();
          break;
        case 'ArrowRight':
          this.meatball.moveRight();
          break;
        default:
          break;
      }
    });  
  }

  _clean() {
    this.ctx.clearRect(0, 0, 400, 700);
  }

  _update() {
    this._clean();
    this._drawPana();
    this._drawEnemies();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._update();
  }
}