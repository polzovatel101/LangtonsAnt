import {Component} from '@angular/core';
import {CellInterface} from './cell/cell.interface';
import {CellModel} from './cell/cell.model';
import {Vector} from './cell/vector.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LangtonsAnt';
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private rightPressed = false;
  private leftPressed = false;
  private paddleHeight = 10;
  private paddleWidth = 75;
  private paddleX;
  private x;
  private y;
  private dx;
  private dy;
  private columnsNumber = 10;
  private rowsNumber = 10;
  private cellWidth = 50;
  private cells: [[CellInterface]] = [[new CellModel()]];
  private antX: number;
  private antY: number;

  constructor() {
    this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.dx = 2;
    this.dy = -2;
    this.antX = ((this.columnsNumber / 2) * this.cellWidth) + this.cellWidth / 2;
    this.antY = ((this.rowsNumber / 2) * this.cellWidth) + this.cellWidth / 2;

    this.createCells();

    setInterval(() => {
      // TODO: change on requestAnimationFrame(draw);
      this.draw();
    }, 1000);
  }

  draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderCells();
    this.renderAnt();
    this.checkSelectedCell();
  }

  createCells(): void {
    for (let i = 0; i < this.rowsNumber; i++) {
      for (let j = 0; j < this.columnsNumber; j++) {
        if (!this.cells[i]) {
          this.cells[i] = [new CellModel()];
        }

        this.cells[i][j] = new CellModel(Math.random() > 0.5);
      }
    }
  }

  renderCells(): void {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'grey';
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (this.cells[i][j].value) {
          this.ctx.fillStyle = 'white';
        } else {
          this.ctx.fillStyle = 'grey';
        }

        this.ctx.fillRect(i * this.cellWidth, j * this.cellWidth, this.cellWidth, this.cellWidth);
        this.ctx.strokeRect(i * this.cellWidth, j * this.cellWidth, this.cellWidth, this.cellWidth);
      }
    }
    this.ctx.closePath();
  }

  renderAnt(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.antX, this.antY, this.cellWidth / 4, 0, Math.PI * 2);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.closePath();
  }

  checkSelectedCell(): void {
    const i = Math.floor(this.antX / this.cellWidth);
    const j = Math.floor(this.antY / this.cellWidth);

    if (this.cells[i] && this.cells[i][j]) {
      const cellValue = this.cells[i][j];

      if (cellValue) {
       this.moveAnt(cellValue);
      }

      this.cells[i][j].value = !this.cells[i][j].value;
    }
  }

  moveAnt(cellValue: CellInterface): void {
    if (cellValue.value) {
      switch (cellValue.vector) {
        case Vector[1]:
        case null:
          cellValue.vector = Vector[2];
          break;
        case Vector[0]:
          cellValue.vector = Vector[3];
          break;
        case Vector[2]:
          cellValue.vector = Vector[0];
          break;
        case Vector[3]:
          cellValue.vector = Vector[1];
          break;
      }
    } else {
      switch (cellValue.vector) {
        case Vector[1]:
        case null:
          cellValue.vector = Vector[3];
          break;
        case Vector[0]:
          cellValue.vector = Vector[2];
          break;
        case Vector[2]:
          cellValue.vector = Vector[1];
          break;
        case Vector[3]:
          cellValue.vector = Vector[0];
          break;
      }
    }

    switch (cellValue.vector) {
      case Vector[0]:
        this.antY -= this.cellWidth;
        // this.antX -= this.cellWidth;
        break;
      case Vector[1]:
        this.antY += this.cellWidth;
        // this.antX += this.cellWidth;
        break;
      case Vector[2]:
        this.antX -= this.cellWidth;
        // this.antY -= this.cellWidth;
        break;
      case Vector[3]:
        this.antX += this.cellWidth;
        // this.antY += this.cellWidth;
        break;
    }
  }
}
