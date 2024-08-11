export interface Card {
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  gridSize: number;
  cards: Card[];
}
