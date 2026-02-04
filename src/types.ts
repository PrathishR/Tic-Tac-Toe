export  type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[][];
export type Position = { row: number; col: number };
export type WinState = Position[] | null;
  