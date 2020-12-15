import {CellInterface} from './cell.interface';

export class CellModel implements CellInterface {
  public value: boolean;
  public vectorX: boolean;
  public vectorY: boolean;

  constructor(cellValue?: boolean, vectorX?: boolean, vectorY?: boolean) {
    this.value = cellValue || false;
    this.vectorX = vectorX || false;
    this.vectorY = vectorY || false;
  }
}
