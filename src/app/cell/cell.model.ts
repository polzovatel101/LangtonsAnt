import {CellInterface} from './cell.interface';

export class CellModel implements CellInterface {
  public value: boolean;

  constructor(cellValue?: boolean) {
    this.value = cellValue || false;
  }
}
