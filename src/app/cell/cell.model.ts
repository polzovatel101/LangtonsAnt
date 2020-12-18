import {CellInterface} from './cell.interface';

export class CellModel implements CellInterface {
  public value: boolean;
  public vector: string;

  constructor(cellValue?: boolean, vector?: string) {
    this.value = cellValue || false;
    this.vector = vector || null;
  }
}
