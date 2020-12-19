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
  private columnsNumber = 20;
  private rowsNumber = 20;
  private cellWidth = 25;
  // if cell value is true -> white cell
  private cells: [[CellInterface]] = [[new CellModel()]];
  private antX: number;
  private antY: number;
  private currentVector: string;

  constructor() {
    this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    // place ant on center (doesn't work for even number of rows and columns)
    this.antX = ((this.columnsNumber / 2) * this.cellWidth) + this.cellWidth / 2;
    this.antY = ((this.rowsNumber / 2) * this.cellWidth) + this.cellWidth / 2;

    this.createCells();

    // redraw cells and check currrent cell to move
    setInterval(() => {
      this.draw();
      this.checkSelectedCell();
    }, 100);
  }

  draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderCells();
    this.renderAnt();
    // uncomment to make it faster (should commit setInterval before)
    // requestAnimationFrame(() => this.draw());
  }

  createCells(): void {
    for (let i = 0; i < this.rowsNumber; i++) {
      for (let j = 0; j < this.columnsNumber; j++) {
        if (!this.cells[i]) {
          this.cells[i] = [new CellModel()];
        }

        // to randomize cells uncomment
        // this.cells[i][j] = new CellModel(Math.random() >= 0.5);
        // instead of
        this.cells[i][j] = new CellModel(true);
      }
    }
  }

  renderCells(): void {
    this.ctx.beginPath();
    // border color
    this.ctx.strokeStyle = 'grey';
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (this.cells[i][j].value) {
          // cell color
          this.ctx.fillStyle = 'white';
        } else {
          // cell color
          this.ctx.fillStyle = 'grey';
        }

        // draw rectangle (cell)
        this.ctx.fillRect(i * this.cellWidth, j * this.cellWidth, this.cellWidth, this.cellWidth);
        // draw border of cell
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
        // turn ant left/right and move depends on cell value
        this.turnAnt(cellValue);
        this.moveAnt();
      }

      // change cell value(color) after visit
      cellValue.value = !cellValue.value;
    }
  }

  turnAnt(cellValue): void {
    if (cellValue.value) {
      switch (this.currentVector) {
        case Vector[1]:
        case null:
        case undefined:
          this.currentVector = Vector[3];
          break;
        case Vector[0]:
          this.currentVector = Vector[2];
          break;
        case Vector[2]:
          this.currentVector = Vector[1];
          break;
        case Vector[3]:
          this.currentVector = Vector[0];
          break;
      }
    } else {
      switch (this.currentVector) {
        case Vector[1]:
        case null:
        case undefined:
          this.currentVector = Vector[2];
          break;
        case Vector[0]:
          this.currentVector = Vector[3];
          break;
        case Vector[2]:
          this.currentVector = Vector[0];
          break;
        case Vector[3]:
          this.currentVector = Vector[1];
          break;
      }
    }
  }

  moveAnt(): void {
    switch (this.currentVector) {
      case Vector[0]:
        if (this.antY < (this.cellWidth * this.columnsNumber - this.cellWidth)) {
          this.antY += this.cellWidth;
        }
        break;
      case Vector[1]:
        if (this.antY > this.cellWidth) {
          this.antY -= this.cellWidth;
        }
        break;
      case Vector[2]:
        if (this.antX > this.cellWidth) {
          this.antX -= this.cellWidth;
        }
        break;
      case Vector[3]:
        if (this.antX < (this.cellWidth * this.rowsNumber - this.cellWidth)) {
          this.antX += this.cellWidth;
        }
        break;
    }
  }
}
