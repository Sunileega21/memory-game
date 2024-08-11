import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  
}

interface GameState {
  cards: Card[];
  flippedIndices: number[];
  moves: number;
  misses: number;
  matchedPairs: number;
  isGameCompleted: boolean;
}

const initialState: GameState = {
  cards: [],
  flippedIndices: [],
  moves: 0,
  misses: 0,
  matchedPairs: 0,
  isGameCompleted: false,
  
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGame(state, action: PayloadAction<number>) {
      const gridSize = action.payload;
      const totalCards = gridSize * gridSize;
      const cardContent = Array.from({ length: totalCards / 2 }, (_, i) => `/images/image${Math.floor(Math.random() * 55)}.png`);

      const cards = [...cardContent, ...cardContent]
        .sort(() => Math.random() - 0.5)
        .map((content, index) => ({
          id: index,
          content,
          isFlipped: false,
          isMatched: false,
        }));

      state.cards = cards;
      state.flippedIndices = [];
      state.moves = 0;
      state.misses = 0;
      state.matchedPairs = 0;
      state.isGameCompleted = false;
    },
    flipCard(state, action: PayloadAction<number>) {
      const index = state.cards.findIndex(card => card.id === action.payload);

      if (state.flippedIndices.length === 2) {
        // Reset previous flipped cards if a third card is clicked
        state.flippedIndices.forEach(idx => {
          state.cards[idx].isFlipped = false;
        });
        state.flippedIndices = [];
      }

      if (index !== -1 && !state.cards[index].isFlipped && !state.cards[index].isMatched) {
        state.cards[index].isFlipped = true;
        state.flippedIndices.push(index);
      }
    },
    checkMatch(state) {
      if (state.flippedIndices.length === 2) {
        state.moves += 1;

        const [firstIndex, secondIndex] = state.flippedIndices;
        const firstCard = state.cards[firstIndex];
        const secondCard = state.cards[secondIndex];

        if (firstCard.content === secondCard.content) {
          state.cards[firstIndex].isMatched = true;
          state.cards[secondIndex].isMatched = true;
          state.matchedPairs += 1;
          // Check if the game is completed
          if (state.matchedPairs === state.cards.length / 2) {
            state.isGameCompleted = true; // Set game completed status
          }
        } else {
          state.misses += 1;
          state.cards[firstIndex].isFlipped = false;
          state.cards[secondIndex].isFlipped = false;
        }

        state.flippedIndices = [];
      }
    },
    resetGame(state) {
      // Reset the game state to its initial values
      state.cards = state.cards.map(card => ({
        ...card,
        isFlipped: false,
        isMatched: false,
      }));
      state.flippedIndices = [];
      state.moves = 0;
      state.misses = 0;
      state.matchedPairs = 0;
      state.isGameCompleted = false;
    },
  },
});

export const { initializeGame, flipCard, checkMatch } = gameSlice.actions;
export default gameSlice.reducer;
